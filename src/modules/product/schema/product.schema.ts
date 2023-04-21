import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Product extends Document {

    @Prop({ required: true })
    name: string;

    @Prop({ type: [String], required: true })
    category: string[];

    @Prop({ default: "" })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: 1 })
    stock: number;

    @Prop({ default: "" })
    cover: string;

    @Prop({ type: [String], default: [] })
    images: string[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);