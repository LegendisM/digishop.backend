import { Body, Controller, Get } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Auth } from "../auth/auth.decorator";
import { FindProducts, FindProductsResult } from "./dto/find-product.dto";

@Controller({
    path: 'product',
    version: '1'
})
@Auth()
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get('find')
    async find(@Body() dto: FindProducts): Promise<FindProductsResult> {
        let products = await this.productService.find({ category: dto.category }, {}, { skip: (dto.page - 1) * dto.limit, limit: dto.limit * 1 });
        let productCount = await this.productService.count();
        return {
            current_page: dto.page,
            total_pages: Math.ceil(productCount / dto.limit),
            products
        };
    }
}