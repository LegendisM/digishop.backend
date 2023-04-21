import { Schema } from "mongoose";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class BaseSupportDto {
    @IsMongoId()
    owner: Schema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    content: string;
}