import { IsNumber, IsPositive } from "class-validator";

export class PaginationDto {
    @IsPositive()
    page: number;

    @IsPositive()
    limit: number;
}

export class PaginationResultDto {
    @IsNumber()
    current_page: number;

    @IsNumber()
    total_pages: number;
}