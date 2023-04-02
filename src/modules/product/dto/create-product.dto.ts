import { IsNotEmpty, IsString, MaxLength, MinLength, IsNumberString, IsEnum } from "class-validator";
import { ProductCategories } from "../interface/product.interface";


export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsEnum(ProductCategories)
    category: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(250)
    description: string;

    @IsString()
    image: string;

    @IsNumberString()
    price: number;

    @IsNumberString()
    stock: number;

}