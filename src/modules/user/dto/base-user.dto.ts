import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Role } from "../interface/role.interface";
import { ApiProperty } from "@nestjs/swagger";

export class BaseUserDto {
    @ApiProperty({
        required: true,
        minLength: 3,
        maxLength: 16,
        example: 'alexa'
    })
    @IsString()
    @Length(3, 16)
    username: string;

    @ApiProperty({
        required: true,
        minLength: 3,
        maxLength: 20
    })
    @IsString()
    @Length(3, 20)
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({
        minLength: 10,
        maxLength: 10
    })
    @IsString()
    @Length(10, 10)
    nationalcode: string;

    @ApiProperty({
        enum: Role,
        isArray: true
    })
    @IsArray()
    roles: Role[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar?: string;
}