import { PartialType } from "@nestjs/swagger";
import { ISupport } from "../interface/support.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";

export class FindSupportDto extends PartialType(
    IdentifierDto
) { }

export class FindSupportResultDto {
    support: ISupport;
}

export class FindSupportsResultDto {
    supports: ISupport[]
}
