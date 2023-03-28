import { IsEnum, IsNumberString } from "class-validator";
import { ProductCategories } from "../product.structure";
import { ProductModel } from "../product.model";

export class FindProducts {

    @IsEnum(ProductCategories)
    category: string;

    @IsNumberString()
    page: number;

    @IsNumberString()
    limit: number;

}

export class FindProductsResult {

    current_page: number;
    total_pages: number;
    products: ProductModel[]

}