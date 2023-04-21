import { PartialType } from "@nestjs/swagger";
import { IdentifierDto } from "src/common/dto/identifier.dto";

export class DeleteProductDto extends PartialType(IdentifierDto) { }