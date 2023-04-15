import { IsEnum, IsNumberString, IsString } from "class-validator";
import { ProductCategories } from "../interface/product.interface";
import { ProductModel } from "../product.model";

export class SearchProduct {

    @IsEnum(ProductCategories)
    category: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumberString()
    page: number;

    @IsNumberString()
    limit: number;

}

export class SearchProductResult {

    current_page: number;
    total_pages: number;
    products: ProductModel[]

}