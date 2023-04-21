import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct } from "./interface/product.interface";
import { DeleteProductDto } from "./dto/delete-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async create(createDto: CreateProductDto): Promise<IProduct> {
        return await this.productModel.create(createDto);
    }

    async findAll(findAllDto: FindProducts): Promise<FindProductsResult> {
        let { page, limit } = findAllDto;
        let productCount = await this.productModel.count();
        let products = await this.productModel.find({
            $or: [
                { category: { $in: findAllDto.category } },
                { name: { $regex: findAllDto.name } },
                { description: { $regex: findAllDto.description } },
            ]
        }).skip((page - 1) * limit).limit(limit - 1);
        return {
            current_page: page,
            total_pages: Math.ceil(productCount / limit),
            products
        };
    }

    async update(updateDto: UpdateProductDto): Promise<IProduct> {
        let { id } = updateDto;
        return await this.productModel.findByIdAndUpdate(id, updateDto);
    }

    async remove(deleteDto: DeleteProductDto): Promise<IProduct> {
        let { id } = deleteDto;
        return await this.productModel.findByIdAndRemove(id);
    }

}