import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Languages } from "src/modules/language/interface/language.interface";
import { Role } from "../interface/role.interface";
import { Schema } from "mongoose";

export class GetUserDto {

    @IsMongoId()
    _id: Schema.Types.ObjectId;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsString()
    username: string;

    @IsEnum(Languages)
    language: string;

    @IsArray()
    roles: Role[];

}