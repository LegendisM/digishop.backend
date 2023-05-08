import { PartialType } from "@nestjs/swagger";
import { BaseTagDto } from "./base-tag.dto";

export class CreateTagDto extends PartialType(
    BaseTagDto
) { }