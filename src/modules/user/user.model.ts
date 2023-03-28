import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ collection: "users", timestamps: true })
export class UserModel {

    @Prop({ required: true })
    username: string;

    @Prop({ default: "" })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: "" })
    avatar: string;

    @Prop({ default: 250000 })
    balance: number;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);