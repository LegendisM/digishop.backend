import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FindSupportDto, FindSupportResultDto, FindSupportsResultDto } from "./dto/find-support.dto";
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
    async findAll(): Promise<FindSupportsResultDto> {
        return await this.supportService.findAll();
    }

    @Get('me')
    async findMe(@User() userDto: GetUserDto): Promise<FindSupportsResultDto> {
        return await this.supportService.findByOwner(userDto);
    }

    @Get(':id')
    async findById(@Param() findOneDto: FindSupportDto, @User() userDto: GetUserDto): Promise<FindSupportResultDto> {
        return await this.supportService.findById(findOneDto, userDto);
    }

    @Post()
    async create(@Body() createDto: CreateSupportDto, @User() userDto: GetUserDto) {
        let support = await this.supportService.create(createDto, userDto);
        return { state: !!support }
    }
}