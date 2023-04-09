import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { UserModel } from "src/modules/user/user.model";

export class SignInDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(40)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(40)
    password: string;

}

export class SignInResultDto {

    @IsBoolean()
    state: boolean;

    user: UserModel | null;

    @IsString()
    token: string;

    @IsString()
    message: string;

}