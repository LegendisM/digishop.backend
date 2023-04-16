import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateSupportDto {

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    content: string;

}