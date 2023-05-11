import { ApiProperty } from "@nestjs/swagger";
import { IsPositive } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        minimum: 1
    })
    @IsPositive()
    page: number;

    @ApiProperty({
        minimum: 1
    })
    @IsPositive()
    limit: number;
}

export interface IPaginationResult {
    current_page: number;
    total_pages: number;
}