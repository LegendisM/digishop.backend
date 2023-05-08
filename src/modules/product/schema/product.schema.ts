import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { IUser } from "src/modules/user/interface/user.interface";
import { User } from "src/modules/user/schema/user.schema";
import { IProduct } from "../interface/product.interface";
import { Tag } from "src/modules/tag/schema/tag.schema";
import { ITag } from "src/modules/tag/interface/tag.interface";

@Schema({ timestamps: true })
export class Product extends Document implements IProduct {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    owner: Types.ObjectId | IUser;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
    tags: (Types.ObjectId | ITag)[];

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

export const ProductSchema = SchemaFactory.createForClass<Product>(Product);