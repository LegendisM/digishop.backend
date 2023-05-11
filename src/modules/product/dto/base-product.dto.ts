import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsArray, IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class BaseProductDto {
    @IsMongoId()
    owner: Types.ObjectId;

    @ApiProperty({
        maxLength: 50
    })
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @ApiProperty({
        maxLength: 250
    })
    @IsString()
    @MaxLength(250)
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    stock: number;

    @ApiProperty()
    cover?: string;
}