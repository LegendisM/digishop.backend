import { IsNumber, IsString, Length, Min } from "class-validator";

export class BaseTagDto {
    @IsString()
    @Length(1, 25)
    name: string;

    @IsString()
    @Length(1, 255)
    description: string;

    @IsNumber()
    @Min(0)
    sort: number;
}