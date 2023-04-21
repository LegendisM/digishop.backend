import { IsString, MaxLength, IsNumber, IsArray } from "class-validator";

export class BaseProductDto {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsArray()
    @IsString({ each: true })
    category: string[];

    @IsString()
    @MaxLength(250)
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    cover?: string;
}