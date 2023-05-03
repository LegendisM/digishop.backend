import { PickType } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { BaseUserDto } from "src/modules/user/dto/base-user.dto";

export class GetProfileResultDto extends PickType(
    BaseUserDto,
    ['username', 'email', 'nationalcode', 'avatar']
) {
    @IsBoolean()
    state: boolean;
}