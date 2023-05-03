import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { GetSupportDto, GetSupportResultDto, GetSupportsResultDto } from "./dto/get-support.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";

@Controller({
    path: 'support',
    version: '1'
})
@Auth()
export class SupportController {
    constructor(
        private supportService: SupportService
    ) { }

    @Get()
    @Roles(Role.ADMIN)
    async getSupports(): Promise<GetSupportsResultDto> {
        return await this.supportService.searchSupports();
    }

    @Get('me')
    async getOwnSupports(@User() userDto: GetUserDto): Promise<GetSupportsResultDto> {
        return await this.supportService.searchSupports(userDto);
    }

    @Get(':id')
    async getSupportById(@Param() findOneDto: GetSupportDto, @User() userDto: GetUserDto): Promise<GetSupportResultDto> {
        return await this.supportService.getSupportById(findOneDto, userDto);
    }

    @Post()
    async createSupport(@Body() createDto: CreateSupportDto, @User() userDto: GetUserDto) {
        let support = await this.supportService.createSupport(createDto, userDto);
        return { state: !!support }
    }
}