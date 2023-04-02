import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Languages } from "../language/interface/language.interface";
import { Role } from "./interface/role.interface";

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

    @Prop({ default: [Role.USER] })
    roles: Role[];

    @Prop({ enum: Object.keys(Languages), default: Languages.FA })
    language: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);