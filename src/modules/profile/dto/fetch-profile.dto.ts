import { IsBoolean, IsString } from "class-validator";

export class FetchProfileResultDto {

    @IsBoolean()
    state: boolean;

    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    nationalcode: string;

    @IsString()
    avatar: string;

}