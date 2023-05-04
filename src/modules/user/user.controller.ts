import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/decorator/auth.decorator";
import { GetUserDto } from "./dto/get-user.dto";
import _ from "lodash";
import { User } from "./decorator/user.decorator";
import { BaseResponseResultDto } from "src/common/dto/base-response.dto";

@Controller({
    path: 'user',
    version: '1'
})
@Auth()
export class UserController {
    constructor() { }

    @Get()
    async findMe(
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<GetUserDto>> {
        return { data: userDto };
    }
}