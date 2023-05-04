import { FileInterceptor } from "@nestjs/platform-express";
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CompressedFile } from "src/common/decorator/compress.decorator";
import { BaseResponseResultDto } from "src/common/dto/base-response.dto";

@Controller({
    path: 'profile',
    version: '1'
})
@Auth()
export class ProfileController {
    constructor(
        private profileService: ProfileService
    ) { }

    @Get()
    async findMe(
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<object>> {
        let profile = await this.profileService.find(userDto.id);
        return {
            state: !!profile,
            data: profile
        };
    }

    @Put()
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @Body() updateDto: UpdateProfileDto,
        @User() userDto: GetUserDto,
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
    ): Promise<BaseResponseResultDto<boolean>> {
        if (avatar) {
            updateDto.avatar = avatar.filename;
        }
        let result = await this.profileService.update(updateDto, userDto.id);
        return {
            data: result.state,
            ...result
        };
    }
}