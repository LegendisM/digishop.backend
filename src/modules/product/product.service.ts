import fs from "fs";
import mongoose, { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { FindProductsDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct, IProductList } from "./interface/product.interface";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async create(createDto: CreateProductDto, owner: string): Promise<IProduct> {
        return await this.productModel.create({ ...createDto, ...{ owner: owner } });
    }

    async findById(id: string): Promise<IProduct> {
        return await this.productModel.findById(id);
    }

    async findAll(
        findDto: FindProductsDto
    ): Promise<IProductList> {
        let { page, limit, owner = '' } = findDto;
        let filter = ['tags', 'name', 'description'].filter((key) => {
            return findDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { [(key == 'tags' ? "$in" : "$regex")]: findDto[key] } });
        });
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
        return await product.deleteOne();
    }
}