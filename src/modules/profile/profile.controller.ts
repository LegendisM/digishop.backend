import { FileInterceptor } from "@nestjs/platform-express";
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Auth } from "../auth/decorator/auth.decorator";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FetchProfileResultDto } from "./dto/fetch-profile.dto";
import { UpdateProfileDto, UpdateProfileResultDto } from "./dto/update-profile.dto";
import { CompressedFile } from "src/common/decorator/compress.decorator";

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
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @Body() dto: UpdateProfileDto,
        @User() user: GetUserDto,
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
            dto.avatar = avatar.filename;
        }
        return await this.profileService.update(dto, user);
    }

}