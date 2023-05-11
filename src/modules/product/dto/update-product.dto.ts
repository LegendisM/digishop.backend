import { IntersectionType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends IntersectionType(
    CreateProductDto
) { }