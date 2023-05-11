import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../interface/role.interface";
import { Languages } from "../../../common/interface/language.interface";
import { ApiProperty } from "@nestjs/swagger";

export class BaseUserDto {
    @ApiProperty()
    @IsString()
    @Length(3, 25)
    username: string;

    @ApiProperty()
    @IsString()
    @Length(3, 25)
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(10, 10)
    nationalcode: string;

    @ApiProperty()
    @IsEnum(Languages)
    language: string;

    @ApiProperty()
    @IsArray()
    roles: Role[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar?: string;
}