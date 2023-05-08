import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ITag } from "../interface/tag.interface";

@Schema({ timestamps: true })
export class Tag extends Document implements ITag {
    @Prop({ required: true })
    name: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: 0 })
    sort: number;
}

export const TagSchema = SchemaFactory.createForClass<Tag>(Tag);