import _ from "lodash";
import { Controller, Get } from "@nestjs/common";
import { IResponseResult } from "src/common/interface/response.interface";
import { CurrentUser } from "./decorator/user.decorator";
import { Auth } from "../auth/decorator/auth.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUser } from "./interface/user.interface";
import { USER_PUBLIC_PROPERTIES } from "./constant/user.constant";
import { UserService } from "./user.service";

@ApiTags('users')
@Controller({
    path: 'users',
    version: '1'
})
@Auth()
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('me')
    @ApiResponse({ description: `User Public Properties ${USER_PUBLIC_PROPERTIES.join(',')}` })
    async getOwnUser(
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<unknown>> {
        return {
            state: true,
            data: _.pick(
                user,
                USER_PUBLIC_PROPERTIES
            )
        };
    }
}