import { IntersectionType, PickType } from "@nestjs/swagger";
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