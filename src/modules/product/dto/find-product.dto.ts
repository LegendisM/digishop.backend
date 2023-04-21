import { IntersectionType, PickType } from "@nestjs/swagger";
import { IProduct } from "../interface/product.interface";
import { CreateProductDto } from "./create-product.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindProducts extends IntersectionType(
    PickType(CreateProductDto, ['name', 'category', 'description'] as const),
    PaginationDto
) { }

export class FindProductsResult {
    current_page: number;
    total_pages: number;
    products: IProduct[]
}