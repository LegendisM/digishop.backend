import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductDocument, ProductModel } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductModel.name) private productModel: Model<ProductDocument>
    ) { }

    async create(definition: CreateProductDto): Promise<ProductDocument> {
        return await this.productModel.create(definition);
    }

    async findOne(filter: object | ProductModel, projection: ProductModel | object = {}): Promise<ProductDocument> {
        return await this.productModel.findOne(filter, projection);
    }

    async findById(id: string, projection: ProductModel | object = {}): Promise<ProductDocument> {
        return await this.productModel.findById(id, projection);
    }

    async find(filter: object | ProductModel, projection: ProductModel | object = {}, option: object = {}): Promise<ProductDocument[]> {
        return await this.productModel.find(filter, projection, option);
    }

    async updateMany(filter: object | ProductModel, update: object | ProductModel): Promise<any> {
        return await this.productModel.updateMany(filter, update);
    }

    async count(filter: ProductModel | object = {}): Promise<number> {
        return await this.productModel.count(filter);
    }

    async findOneAndRemove(filter: object | ProductModel, option: object = {}): Promise<any> {
        await this.productModel.findOneAndRemove(filter, option);
    }

    async deleteOne(filter: object | ProductModel, option: object = {}): Promise<any> {
        await this.productModel.deleteOne(filter, option);
    }

    async deleteMany(filter: object | ProductModel, option: object = {}): Promise<any> {
        await this.productModel.deleteMany(filter, option);
    }

}