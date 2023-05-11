import { Body, Controller, ForbiddenException, Get, Param, Post } from "@nestjs/common";
import { SupportService } from "./support.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CreateSupportDto } from "./dto/create-support.dto";
import { CurrentUser } from "../user/decorator/user.decorator";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";
import { IResponseResult } from "src/common/interface/response.interface";
import { ISupport } from "./interface/support.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interface/user.interface";

@ApiTags('supports')
@Controller({
    path: 'supports',
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
    async getSupports(): Promise<IResponseResult<ISupport[]>> {
        let supports = await this.supportService.getSupports();
        return {
            state: !!supports,
            data: supports
        }
    }

    @Get('me')
    async getOwnSupports(
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<ISupport[]>> {
        let supports = await this.supportService.getSupportsByOwner(user.id);
        return {
            state: !!supports,
            data: supports
        }
    }

    @Get(':id')
    async getSupportById(
        @Param() { id }: IdentifierDto,
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<ISupport>> {
        let support = await this.supportService.getSupportById(id);
        // * check policy
        if (this.policyFactory.userAbility(user).cannot(PolicyAction.Read, support)) {
            throw new ForbiddenException();
        }
        return {
            state: !!support,
            data: support
        };
    }

    @Post()
    async createSupport(
        @Body() createDto: CreateSupportDto,
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<ISupport>> {
        let support = await this.supportService.createSupport(createDto, user.id);
        return {
            state: !!support,
            data: support
        }
    }
}