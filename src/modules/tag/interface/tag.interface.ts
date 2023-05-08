import { Document } from "mongoose";

export interface ITag extends Document {
    name: string;
    description: string;
    sort: number;
}