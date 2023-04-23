import { IsString, MaxLength, IsArray, IsMongoId, IsNumberString } from "class-validator";
import { Types } from "mongoose";

export class BaseProductDto {
    @IsMongoId()
    owner: Types.ObjectId;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsArray()
    @IsString({ each: true })
    category: string[];

    @IsString()
    @MaxLength(250)
    description: string;

    @IsNumberString()
    price: number;

    @IsNumberString()
    stock: number;

    cover?: string;
}