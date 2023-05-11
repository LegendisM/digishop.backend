import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/decorator/auth.decorator";
import { GetUserDto } from "./dto/get-user.dto";
import _ from "lodash";
import { User } from "./decorator/user.decorator";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller({
    path: 'users',
    version: '1'
})
@Auth()
export class UserController {
    constructor() { }

    @Get('me')
    async getOwn(
        @User() userDto: GetUserDto
    ): Promise<IResponseResult<GetUserDto>> {
        return { data: userDto };
    }
}