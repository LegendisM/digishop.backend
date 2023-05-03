import fs from "fs";
import mongoose, { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { SearchProdcutsDto, SearchProdcutsResultDto } from "./dto/search-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct } from "./interface/product.interface";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { Role } from "../user/interface/role.interface";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async createProduct(createDto: CreateProductDto, userDto: GetUserDto): Promise<IProduct> {
        return await this.productModel.create({ ...createDto, ...{ owner: userDto._id } });
    }

    async getProductById(id: string): Promise<IProduct> {
        return await this.productModel.findById(id);
    }

    async searchProducts(searchDto: SearchProdcutsDto): Promise<SearchProdcutsResultDto> {
        let { page, limit, owner = '' } = searchDto;
        let filter = ['category', 'name', 'description'].filter((key) => {
            return searchDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { [(key == 'category' ? "$in" : "$regex")]: searchDto[key] } });
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

    async updateProduct(updateDto: UpdateProductDto, userDto: GetUserDto): Promise<IProduct> {
        let product = await this.getProductById(updateDto.id);
        if (!userDto._id.equals(product.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return product.updateOne(updateDto);
    }

    async deleteProduct(deleteDto: DeleteProductDto, userDto: GetUserDto): Promise<IProduct> {
        let product = await this.getProductById(deleteDto.id);
        if (!userDto._id.equals(product.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
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