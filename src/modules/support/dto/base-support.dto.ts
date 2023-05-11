import { Types } from "mongoose";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BaseSupportDto {
    @IsMongoId()
    owner: Types.ObjectId;

    @ApiProperty({
        minLength: 1
    })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty()
    @IsString()
    content: string;
}