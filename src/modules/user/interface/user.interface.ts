import { Document } from "mongoose";
import { Role } from "./role.interface";

export interface IUser extends Document {
    username: string;
    email: string;
    nationalcode: string;
    password: string;
    avatar: string;
    roles: Role[];
    language: string;
}