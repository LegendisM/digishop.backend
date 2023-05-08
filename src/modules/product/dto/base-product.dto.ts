import { IsString, MaxLength, IsArray, IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class BaseProductDto {
    @IsMongoId()
    owner: Types.ObjectId;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    @MaxLength(250)
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    cover?: string;
}