import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length, Min } from "class-validator";

export class BaseTagDto {
    @ApiProperty({
        required: true,
        minLength: 1,
        maxLength: 25
    })
    @IsString()
    @Length(1, 25)
    name: string;

    @ApiProperty({
        required: true,
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    description: string;

    @ApiProperty({
        default: 0,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    sort: number = 0;
}