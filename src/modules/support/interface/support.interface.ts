import { Document, Schema } from "mongoose";
import { IUser } from "src/modules/user/interface/user.interface";

export interface ISupport extends Document {
    owner: Schema.Types.ObjectId | IUser;
    status: SupportStatus;
    messages: { owner: Schema.Types.ObjectId | IUser, subject: string, content: string }[];
}

export enum SupportStatus {
    OPEN = "OPEN",
    CLOSE = "CLOSE"
}