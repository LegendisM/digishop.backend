import { Document, Types } from "mongoose";
import { IPaginationResult } from "src/common/dto/pagination.dto";
import { ITag } from "src/modules/tag/interface/tag.interface";
import { IUser } from "src/modules/user/interface/user.interface";

export interface IProduct extends Document {
    owner: Types.ObjectId | IUser;
    name: string;
    tags: (Types.ObjectId | ITag)[];
    description: string;
    price: number;
    stock: number;
    cover: string;
    images: string[];
}

export interface IProductList extends IPaginationResult {
    products: IProduct[];
}