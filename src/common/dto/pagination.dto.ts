import { IsPositive } from "class-validator";

export class PaginationDto {
    @IsPositive()
    page: number;

    @IsPositive()
    limit: number;
}