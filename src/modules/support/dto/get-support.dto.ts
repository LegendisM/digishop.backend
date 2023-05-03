import { PartialType } from "@nestjs/swagger";
import { ISupport } from "../interface/support.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";

export class GetSupportDto extends PartialType(
    IdentifierDto
) { }

export class GetSupportResultDto {
    support: ISupport;
}

export class GetSupportsResultDto {
    supports: ISupport[]
}
