import { IsMongoId, IsString } from "class-validator";

export class IdentifierDto {
    @IsString()
    @IsMongoId()
    id: string;
}