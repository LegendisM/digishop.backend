import _ from "lodash";
import { Controller, Get, Param } from "@nestjs/common";
import { Auth } from "../auth/decorator/auth.decorator";
import { CurrentUser } from "./decorator/user.decorator";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";
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
    async getOwnUser(
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<any>> {
        return {
            state: true,
            data: _.pick(
                user,
                USER_PUBLIC_PROPERTIES
            )
        };
    }

    @Get(':username')
    async getUserByName(
        @Param('username') username: string
    ): Promise<IResponseResult<any>> {
        let user = await this.userService.getOneUser(
            { username },
            USER_PUBLIC_PROPERTIES
        );
        return {
            state: !!user,
            data: user
        };
    }
}