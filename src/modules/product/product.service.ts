import fs from "fs";
import mongoose, { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { FindProductsDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct, IProductList } from "./interface/product.interface";
import { TagService } from "../tag/tag.service";
import { ITag } from "../tag/interface/tag.interface";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private tagService: TagService
    ) { }

    async create(createDto: CreateProductDto, owner: string): Promise<IProduct> {
        let tags: ITag[] = await this.tagService.findByNames(createDto.tags);
        return await this.productModel.create({ ...createDto, ...{ owner: owner }, ...{ tags } });
    }

    async findById(id: string): Promise<IProduct> {
        return await this.productModel.findById(id);
    }

    async findAll(
        findDto: FindProductsDto
    ): Promise<IProductList> {
        let { page, limit, owner = '' } = findDto;
        let filter = ['name', 'description'].filter((key) => {
            return findDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { $regex: findDto[key] } });
        });
        if (findDto.tags.length > 0) {
            Object.assign(filter, { 'tags.name': { $in: findDto.tags } });
        }
        let productCount = await this.productModel.count({
            $or: filter.length > 0 ? filter : [{}],
            owner: (mongoose.isValidObjectId(owner) ? owner : { $ne: null })
        });
        let products = await this.productModel.find({
            $or: filter.length > 0 ? filter : [{}],
            owner: (mongoose.isValidObjectId(owner) ? owner : { $ne: null })
        }).skip((page - 1) * limit).limit(limit - 1).sort({ updatedAt: -1 });
        return {
            current_page: page,
            total_pages: Math.ceil(productCount / limit),
            products
        };
    }

    async update(updateDto: UpdateProductDto): Promise<IProduct> {
        let product = await this.findById(updateDto.id);
        return product.updateOne(updateDto);
    }

    async delete(id: string): Promise<IProduct> {
        let product = await this.findById(id);
        // * unlink cover from storage
        if (product.cover) {
            try {
                let coverPath = `./public/uploads/products/${product.cover}`;
                if (fs.existsSync(coverPath)) {
                    fs.unlinkSync(coverPath);
                }
            } catch (error) { }
        }
        return product ? await product.deleteOne() : null;
    }
}