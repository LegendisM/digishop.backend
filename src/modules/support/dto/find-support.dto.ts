import { PartialType } from "@nestjs/swagger";
import { ISupport } from "../interface/support.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";

export class FindOneSupportDto extends PartialType(
    IdentifierDto
) { }

export class FindOneSupportResultDto {
    support: ISupport;
}

export class FindAllSupportsResultDto {
    supports: ISupport[]
}
