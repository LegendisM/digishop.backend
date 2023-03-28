import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

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