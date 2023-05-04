import { Body, Controller, ForbiddenException, Get, Param, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FindSupportDto, FindSupportResultDto, FindSupportsResultDto } from "./dto/find-support.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";

@Controller({
    path: 'support',
    version: '1'
})
@Auth()
export class SupportController {
    constructor(
        private supportService: SupportService,
        private policyFactory: PolicyFactory
    ) { }

    @Get()
    @Roles(Role.ADMIN)
    async findAll(): Promise<FindSupportsResultDto> {
        let supports = await this.supportService.findAll();
        return {
            supports
        }
    }

    @Get('me')
    async findMe(@User() userDto: GetUserDto): Promise<FindSupportsResultDto> {
        let supports = await this.supportService.findByOwner(userDto.id);
        return {
            supports
        }
    }

    @Get(':id')
    async findById(@Param() findOneDto: FindSupportDto, @User() userDto: GetUserDto): Promise<FindSupportResultDto> {
        let support = await this.supportService.findById(findOneDto.id);
        // * check policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Read, support)) {
            throw new ForbiddenException();
        }
        return {
            support
        };
    }

    @Post()
    async create(@Body() createDto: CreateSupportDto, @User() userDto: GetUserDto) {
        let support = await this.supportService.create(createDto, userDto.id);
        return { state: !!support }
    }
}