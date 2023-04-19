import { IsBoolean, IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    nationalcode: string;

}

export class UpdateProfileResultDto {

    @IsBoolean()
    state: boolean;

    @IsString()
    message: string;
}