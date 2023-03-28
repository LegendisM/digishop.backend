import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";


export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(250)
    description: string;

    @IsString()
    image: string;

    @IsNumber()
    @Min(1)
    price: number;
    
    @IsNumber()
    @Min(1)
    stock: number;

}