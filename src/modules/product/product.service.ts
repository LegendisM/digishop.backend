import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
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
        let filter = ['category', 'name', 'description'].filter((key) => {
            return findAllDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { [(key == 'category' ? "$in" : "$regex")]: findAllDto[key] } });
        });
        let products = await this.productModel.find({
            $or: filter.length > 0 ? filter : [{}],
        }).skip((page - 1) * limit).limit(limit - 1).sort({ updatedAt: -1 });
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