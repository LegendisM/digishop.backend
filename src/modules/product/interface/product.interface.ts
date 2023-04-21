import { Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    category: string[];
    description: string;
    price: number;
    stock: number;
    cover: string;
    images: string[];
}