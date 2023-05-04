import { Document, Types } from "mongoose";
import { IUser } from "src/modules/user/interface/user.interface";

export interface IProduct extends Document {
    owner: Types.ObjectId | IUser;
    name: string;
    category: string[];
    description: string;
    price: number;
    stock: number;
    cover: string;
    images: string[];
}

export interface IProductList {
    current_page: number;
    total_pages: number;
    products: IProduct[];
}