import { FileInterceptor } from "@nestjs/platform-express";
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { CurrentUser } from "../user/decorator/user.decorator";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CompressedFile } from "src/common/decorator/compress.decorator";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interface/user.interface";
import { IProfileResult } from "./interface/profile.interface";
import { I18n, I18nContext } from "nestjs-i18n";

@ApiTags('profiles')
@Controller({
    path: '/profiles',
    version: '1'
})
@Auth()
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) { }

    @Get('/me')
    async getOwnProfile(
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<IProfileResult>> {
        let profile = await this.profileService.find(user.username);
        return {
            state: !!profile,
            data: profile
        };
    }

    @Get('/:username')
    async getProfileByUsername(
        @Param('username') username: string
    ): Promise<IResponseResult<IProfileResult>> {
        let profile = await this.profileService.find(username);
        return {
            state: !!profile,
            data: profile
        }
    }

    @Put('/me')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateOwnProfile(
        @Body() updateDto: UpdateProfileDto,
        @CurrentUser() user: IUser,
        @I18n() i18n: I18nContext,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: false,
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1000 * 5 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
                ],
            }),
        )
        @CompressedFile({ width: 250, quality: 75 })
        avatar: Express.Multer.File
    ): Promise<IResponseResult<boolean>> {
        if (avatar) {
            updateDto.avatar = avatar.filename;
        }
        let result = await this.profileService.update(user.id, updateDto);
        return {
            state: result.state,
            data: result.state,
            message: i18n.t(`profile.${result.message}`)
        };
    }
}