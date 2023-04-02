import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ProductCategories } from "./interface/product.interface";

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ collection: 'products', timestamps: true })
export class ProductModel {

    @Prop({ required: true })
    name: string;

    @Prop({ enum: Object.keys(ProductCategories), default: ProductCategories.GENERAL })
    category: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: 1 })
    stock: number;

    @Prop({ default: "" })
    image: string;

}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);