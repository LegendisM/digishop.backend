import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Query, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { ProductModel } from "./product.model";
import { SearchProduct, SearchProductResult } from "./dto/search-product.dto";

@Controller({
    path: 'product',
    version: '1'
})
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    async find(@Query() dto: FindProducts): Promise<FindProductsResult> {
        let products = await this.productService.find({
            category: dto.category
        }, {}, {
            skip: (dto.page - 1) * dto.limit,
            limit: dto.limit * 1
        });
        let productCount = await this.productService.count();
        return {
            current_page: dto.page,
            total_pages: Math.ceil(productCount / dto.limit),
            products
        };
    }

    @Get('search')
    async search(@Query() dto: SearchProduct): Promise<SearchProductResult> {
        let products = await this.productService.find({
            category: dto.category,
            name: { $regex: `${dto.name}` },
            description: { $regex: `${dto.description}` }
        }, {}, {
            skip: (dto.page - 1) * dto.limit,
            limit: dto.limit * 1
        });
        let productCount = await this.productService.count();
        return {
            current_page: dto.page,
            total_pages: Math.ceil(productCount / dto.limit),
            products
        };
    }

    @Post()
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateProductDto): Promise<ProductModel> {
        return await this.productService.create(dto);
    }

    @Delete()
    @Roles(Role.ADMIN)
    async delete(@Body() dto: DeleteProductDto): Promise<{ state: boolean }> {
        let state = false;
        let product = await this.productService.findById(dto.id);
        if (product) {
            await product.deleteOne();
            state = true;
        }
        return { state };
    }

}