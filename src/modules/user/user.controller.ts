import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/decorator/auth.decorator";
import { GetUserDto } from "./dto/get-user.dto";
import _ from "lodash";
import { User } from "./decorator/user.decorator";

@Controller({
    path: 'user',
    version: '1'
})
@Auth()
export class UserController {
    constructor() { }

    @Get()
    async findMe(@User() userDto: GetUserDto) {
        return _.omit(userDto, ['_id']);
    }
}