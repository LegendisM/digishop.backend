import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { ProductModel } from "./product.model";

@Controller({
    path: 'product',
    version: '1'
})
@Auth()
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    async find(@Body() dto: FindProducts): Promise<FindProductsResult> {
        let products = await this.productService.find({ category: dto.category }, {}, { skip: (dto.page - 1) * dto.limit, limit: dto.limit * 1 });
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
    async delete(@Body() dto: DeleteProductDto): Promise<{ status: boolean }> {
        let status = false;
        let product = await this.productService.findById(dto.id);
        if (product) {
            await product.deleteOne();
            status = true;
        }
        return { status };
    }

}