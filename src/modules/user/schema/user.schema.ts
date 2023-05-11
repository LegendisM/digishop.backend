import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../interface/role.interface";
import { Document } from "mongoose";
import { IUser } from "../interface/user.interface";
import { Languages } from "../../../common/interface/language.interface";

@Schema({ timestamps: true })
export class User extends Document implements IUser {
    @Prop({ required: true })
    username: string;

    @Prop({ default: "" })
    email: string;

    @Prop({ default: "" })
    nationalcode: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: "" })
    avatar: string;

    @Prop({ default: [Role.USER] })
    roles: Role[];

    @Prop({ enum: Object.keys(Languages), default: Languages.EN })
    language: string;
}

export const UserSchema = SchemaFactory.createForClass<User>(User);