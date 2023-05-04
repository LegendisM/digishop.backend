import { Body, Controller, ForbiddenException, Get, Param, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FindSupportDto } from "./dto/find-support.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";
import { BaseResponseResultDto } from "src/common/dto/base-response.dto";
import { ISupport } from "./interface/support.interface";

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
    async findAll(): Promise<BaseResponseResultDto<ISupport[]>> {
        let supports = await this.supportService.findAll();
        return {
            state: !!supports,
            data: supports
        }
    }

    @Get('me')
    async findMe(
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<ISupport[]>> {
        let supports = await this.supportService.findByOwner(userDto.id);
        return {
            state: !!supports,
            data: supports
        }
    }

    @Get(':id')
    async findById(
        @Param() findOneDto: FindSupportDto,
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<ISupport>> {
        let support = await this.supportService.findById(findOneDto.id);
        // * check policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Read, support)) {
            throw new ForbiddenException();
        }
        return {
            state: !!support,
            data: support
        };
    }

    @Post()
    async create(
        @Body() createDto: CreateSupportDto,
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<ISupport>> {
        let support = await this.supportService.create(createDto, userDto.id);
        return {
            state: !!support,
            data: support
        }
    }
}