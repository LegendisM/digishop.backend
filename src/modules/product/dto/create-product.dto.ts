import { OmitType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";

export class CreateProductDto extends OmitType(
    BaseProductDto,
    ['owner']
) { }