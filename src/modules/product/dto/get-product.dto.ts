import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { BaseProductDto } from "./base-product.dto";
import { IsOptional, IsString } from "class-validator";

export class GetProductsFilterDto extends IntersectionType(
    PickType(BaseProductDto, ['name', 'tags', 'description'] as const),
    PaginationDto
) {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsString()
    owner?: string;
}