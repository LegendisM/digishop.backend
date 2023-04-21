import { IntersectionType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { IdentifierDto } from "src/common/dto/identifier.dto";

export class UpdateProductDto extends IntersectionType(
    CreateProductDto,
    IdentifierDto
) { }