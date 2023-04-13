import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserModel } from "src/modules/user/user.model";

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    password: string;

}

export class SignUpResultDto {

    @IsBoolean()
    state: boolean;

    user: UserModel | null;

    @IsString()
    token: string;

    @IsString()
    message: string;

}