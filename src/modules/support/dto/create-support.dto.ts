import { OmitType } from "@nestjs/swagger";
import { BaseSupportDto } from "./base-support.dto";

export class CreateSupportDto extends OmitType(
    BaseSupportDto,
    ['owner']
) { }
