import mongoose, { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SupportStatus } from "../interface/support.interface";
import { User } from "src/modules/user/schema/user.schema";
import { IUser } from "src/modules/user/interface/user.interface";

@Schema({ timestamps: true })
export class Support extends Document {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    owner: Types.ObjectId | IUser;

    @Prop({ enum: Object.keys(SupportStatus), default: SupportStatus.OPEN })
    status: SupportStatus;

    @Prop({
        type: [{
            owner: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
            subject: String,
            content: String
        }]
    })
    messages: { owner: Types.ObjectId | IUser, subject: string, content: string }[];
}

export const SupportSchema = SchemaFactory.createForClass(Support);