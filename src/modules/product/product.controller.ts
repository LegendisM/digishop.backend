import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { IProduct } from "./interface/product.interface";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller({
    path: 'product',
    version: '1'
})
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Post('find')
    @HttpCode(HttpStatus.OK)
    async findAll(@Body() findAllDto: FindProducts): Promise<FindProductsResult> {
        return await this.productService.findAll(findAllDto);
    }

    @Post()
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDto: CreateProductDto): Promise<IProduct> {
        return await this.productService.create(createDto);
    }

    @Put()
    @Roles(Role.ADMIN)
    async update(@Body() updateDto: UpdateProductDto): Promise<{ state: boolean }> {
        let state = await this.productService.update(updateDto);
        return { state: !!state };
    }

    @Delete()
    @Roles(Role.ADMIN)
    async delete(@Body() deleteDto: DeleteProductDto): Promise<{ state: boolean }> {
        let state = await this.productService.remove(deleteDto);
        return { state: !!state };
    }
}