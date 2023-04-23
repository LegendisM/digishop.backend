import { OmitType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";
import { Transform } from "class-transformer";
import { IsArray } from "class-validator";

export class CreateProductDto extends OmitType(
    BaseProductDto,
    ['owner', 'category']
) {
    @IsArray()
    @Transform(({ value }) => value.split(','))
    category: string[]
}