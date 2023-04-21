import { PickType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { BaseUserDto } from "src/modules/user/dto/base-user.dto";
import { IUser } from "src/modules/user/interface/user.interface";

export class AuthDto extends PickType(
    BaseUserDto,
    ['username', 'password']
) { }

export class AuthResultDto {
    @IsBoolean()
    state: boolean;

    user: IUser | null;

    @IsString()
    token: string;

    @IsString()
    message: string;
}