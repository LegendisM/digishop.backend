import { FileInterceptor } from "@nestjs/platform-express";
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { GetProfileResultDto } from "./dto/get-profile.dto";
import { UpdateProfileDto, UpdateProfileResultDto } from "./dto/update-profile.dto";
import { CompressedFile } from "src/common/decorator/compress.decorator";

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
    async getProfile(@User() userDto: GetUserDto): Promise<GetProfileResultDto> {
        return await this.profileService.getProfile(userDto);
    }

    @Put()
    @UseInterceptors(FileInterceptor('avatar'))
    async updateProfile(
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
    ): Promise<UpdateProfileResultDto> {
        if (avatar) {
            updateDto.avatar = avatar.filename;
        }
        return await this.profileService.updateProfile(updateDto, userDto);
    }
}