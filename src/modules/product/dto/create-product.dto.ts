import { ApiProperty, OmitType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";
import { Transform } from "class-transformer";
import { IsArray } from "class-validator";

export class CreateProductDto extends OmitType(
    BaseProductDto,
    ['owner', 'tags']
) {
    @ApiProperty({
        type: String,
        description: 'Seprated Tags With ,',
        example: 'General,Test,More'
    })
    @IsArray()
    @Transform(({ value }) => value.split(','))
    tags: string[]
}