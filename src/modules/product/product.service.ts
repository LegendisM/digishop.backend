import mongoose, { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./schema/product.schema";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";
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

    async create(createDto: CreateProductDto, userDto: GetUserDto): Promise<IProduct> {
        return await this.productModel.create({ ...createDto, ...{ owner: userDto._id } });
    }

    async findById(id: string): Promise<IProduct> {
        return await this.productModel.findById(id);
    }

    async findAll(findAllDto: FindProducts): Promise<FindProductsResult> {
        let { page, limit, owner = '' } = findAllDto;
        let productCount = await this.productModel.count();
        let filter = ['category', 'name', 'description'].filter((key) => {
            return findAllDto[key].length > 0;
        }).map((key) => {
            return ({ [key]: { [(key == 'category' ? "$in" : "$regex")]: findAllDto[key] } });
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
        if (!userDto._id.equals(product.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return product.updateOne(updateDto);
    }

    async remove(deleteDto: DeleteProductDto, userDto: GetUserDto): Promise<IProduct> {
        let product = await this.findById(deleteDto.id);
        if (!userDto._id.equals(product.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return await product.deleteOne();
    }
}