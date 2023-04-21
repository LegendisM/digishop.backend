import { Body, Controller, Get, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";

@Controller({
    path: 'support',
    version: '1'
})
@Auth()
export class SupportController {
    constructor(
        private supportService: SupportService
    ) { }

    @Post()
    async create(@Body() createDto: CreateSupportDto, @User() userDto: GetUserDto) {
        let support = await this.supportService.create(createDto, userDto);
        return { state: !!support }
    }
}