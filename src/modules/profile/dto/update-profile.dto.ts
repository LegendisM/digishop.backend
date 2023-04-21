import { PickType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { BaseUserDto } from "src/modules/user/dto/base-user.dto";

export class UpdateProfileDto extends PickType(
    BaseUserDto,
    ['username', 'email', 'nationalcode', 'avatar']
) { }

export class UpdateProfileResultDto {
    @IsBoolean()
    state: boolean;

    @IsString()
    message: string;
}