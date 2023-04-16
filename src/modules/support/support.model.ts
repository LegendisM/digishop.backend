import mongoose, { HydratedDocument } from "mongoose";
import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { UserModel } from "src/modules/user/user.model";
import { SupportStatus } from "./interface/support.interface";

export type SupportDocument = HydratedDocument<SupportModel>;

@Schema({ collection: 'supports', timestamps: true })
export class SupportModel {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    owner: UserModel;

    @Prop({ enum: Object.keys(SupportStatus), default: SupportStatus.OPEN })
    status: string;

    @Prop({
        type: [{
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            subject: String,
            content: String
        }]
    })
    messages: [{ owner: mongoose.Schema.Types.ObjectId | UserModel, subject: string, content: string }];

}

export const SupportSchema = SchemaFactory.createForClass(SupportModel);