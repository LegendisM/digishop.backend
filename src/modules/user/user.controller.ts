import _ from "lodash";
import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/decorator/auth.decorator";
import { CurrentUser } from "./decorator/user.decorator";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "./interface/user.interface";

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
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<any>> {
        return {
            data: _.pick(
                user,
                ['username', 'email', 'avatar', 'roles', 'language']
            )
        };
    }
}