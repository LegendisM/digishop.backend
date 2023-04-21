import fs from "fs";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { FetchProfileResultDto } from "./dto/fetch-profile.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { UpdateProfileDto, UpdateProfileResultDto } from "./dto/update-profile.dto";
import { LanguageService } from "../language/language.service";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private languageService: LanguageService
    ) { }

    async fetch(userDto: GetUserDto): Promise<FetchProfileResultDto> {
        let { id } = userDto;
        let username = '', email = '', nationalcode = '', avatar = '', state = false;
        let user = await this.userService.findOne({ _id: id });
        if (user) {
            username = user.username;
            email = user.email;
            nationalcode = user.nationalcode;
            avatar = user.avatar;
            state = true;
        }
        return { state, username, email, nationalcode, avatar };
    }

    async update(updateDto: UpdateProfileDto, userDto: GetUserDto): Promise<UpdateProfileResultDto> {
        let { id } = userDto;
        let message = '', state = false;
        let user = await this.userService.findById(id);
        let existUser = await this.userService.findOne({
            $and: [
                { $or: [{ username: updateDto.username }, { email: updateDto.email }, { nationalcode: updateDto.nationalcode }] },
                { _id: { $ne: id } }
            ]
        });

        if (!existUser) {
            await user.updateOne(updateDto);
            // * unlink oldest avatar from storage
            if (updateDto.avatar) {
                let oldAvatarPath = `./public/uploads/avatars/${user.avatar}`;
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath);
                }
            }
            state = true;
            message = 'update_success';
        } else {
            message = 'already_information_used';
        }

        return { state, message: this.languageService.get(message) };
    }
}