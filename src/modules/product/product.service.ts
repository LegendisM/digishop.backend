import fs from "fs";
import mongoose, { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { FindProdcutsDto, FindProdcutsResultDto } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct } from "./interface/product.interface";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private policyFactory: PolicyFactory
    ) { }

    async create(createDto: CreateProductDto, userDto: GetUserDto): Promise<IProduct> {
        return await this.productModel.create({ ...createDto, ...{ owner: userDto._id } });
    }

    async findById(id: string): Promise<IProduct> {
        return await this.productModel.findById(id);
    }

    async findAll(findDto: FindProdcutsDto): Promise<FindProdcutsResultDto> {
        let { page, limit, owner = '' } = findDto;
        let filter = ['category', 'name', 'description'].filter((key) => {
            return findDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { [(key == 'category' ? "$in" : "$regex")]: findDto[key] } });
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

    async update(updateDto: UpdateProductDto, userDto: GetUserDto): Promise<IProduct> {
        let product = await this.findById(updateDto.id);
        // * check policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Update, product)) {
            throw new ForbiddenException();
        }
        return product.updateOne(updateDto);
    }

    async delete(deleteDto: DeleteProductDto, userDto: GetUserDto): Promise<IProduct> {
        let product = await this.findById(deleteDto.id);
        // * ckeck policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Delete, product)) {
            throw new ForbiddenException();
        }
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