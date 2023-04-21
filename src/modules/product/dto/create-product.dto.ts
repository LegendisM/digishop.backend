import { PartialType } from "@nestjs/swagger";
import { BaseProductDto } from "./base-product.dto";

export class CreateProductDto extends PartialType(BaseProductDto) { }