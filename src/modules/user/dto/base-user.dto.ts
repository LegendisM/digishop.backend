import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../interface/role.interface";
import { Languages } from "src/modules/language/interface/language.interface";
import { Exclude } from "class-transformer";

export class BaseUserDto {
    @IsString()
    @Length(3, 25)
    username: string;

    @IsString()
    @Length(3, 25)
    @Exclude()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(10, 10)
    nationalcode: string;

    @IsEnum(Languages)
    language: string;

    @IsArray()
    roles: Role[];

    @IsOptional()
    @IsString()
    avatar?: string;
}