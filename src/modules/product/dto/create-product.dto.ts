import { OmitType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";
import { Transform } from "class-transformer";
import { IsArray } from "class-validator";

export class CreateProductDto extends OmitType(
    BaseProductDto,
    ['owner', 'tags']
) {
    @IsArray()
    @Transform(({ value }) => value.split(','))
    tags: string[]
}