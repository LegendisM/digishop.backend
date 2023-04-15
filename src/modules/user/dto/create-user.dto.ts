import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

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