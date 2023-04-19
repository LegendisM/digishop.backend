import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { FetchProfileResultDto } from "./dto/fetch-profile.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller({
    path: 'profile',
    version: '1'
})
@Auth()
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @Get()
    async fetch(@User() dto: GetUserDto): Promise<FetchProfileResultDto> {
        return await this.profileService.fetch(dto);
    }

    @Put()
    async update(@Body() dto: UpdateProfileDto, @User() user: GetUserDto) {
        return await this.profileService.update(dto, user);
    }

}