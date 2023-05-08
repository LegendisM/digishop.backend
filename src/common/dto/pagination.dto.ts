import { IsPositive } from "class-validator";

export class PaginationDto {
    @IsPositive()
    page: number;

    @IsPositive()
    limit: number;
}

export interface IPaginationResult {
    current_page: number;
    total_pages: number;
}