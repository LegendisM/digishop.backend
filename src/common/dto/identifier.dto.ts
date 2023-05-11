import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString } from "class-validator";

export class IdentifierDto {
    @ApiProperty()
    @IsString()
    @IsMongoId()
    id: string;
}