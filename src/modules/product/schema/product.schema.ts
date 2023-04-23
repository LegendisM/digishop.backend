import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { IUser } from "src/modules/user/interface/user.interface";
import { User } from "src/modules/user/schema/user.schema";

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    owner: Types.ObjectId | IUser;

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