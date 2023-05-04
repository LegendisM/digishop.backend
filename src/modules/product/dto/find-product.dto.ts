import { IntersectionType, PickType } from "@nestjs/swagger";
import { IProduct } from "../interface/product.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { BaseProductDto } from "./base-product.dto";
import { IsOptional, IsString } from "class-validator";

export class FindProductsDto extends IntersectionType(
    PickType(BaseProductDto, ['name', 'category', 'description'] as const),
    PaginationDto
) {
    @IsOptional()
    @IsString()
    owner?: string;
}

export class FindProductResultDto {
    state: boolean;
    product: IProduct;
}

export class FindProductsResultDto {
    current_page: number;
    total_pages: number;
    products: IProduct[]
}