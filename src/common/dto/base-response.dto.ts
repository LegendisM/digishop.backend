import { IsBoolean, IsString } from "class-validator";

export class BaseResponseResultDto<T> {
    @IsBoolean()
    state?: boolean = true;

    data: T = {} as T;

    @IsString()
    message?: string;
}