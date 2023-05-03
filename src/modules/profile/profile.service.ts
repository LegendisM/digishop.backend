import fs from "fs";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { GetProfileResultDto } from "./dto/get-profile.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { UpdateProfileDto, UpdateProfileResultDto } from "./dto/update-profile.dto";
import { LanguageService } from "../language/language.service";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private languageService: LanguageService
    ) { }

    async getProfile(userDto: GetUserDto): Promise<GetProfileResultDto> {
        let { id } = userDto;
        let username = '', email = '', nationalcode = '', avatar = '', state = false;
        let user = await this.userService.getUser({ _id: id });
        if (user) {
            username = user.username;
            email = user.email;
            nationalcode = user.nationalcode;
            avatar = user.avatar;
            state = true;
        }
        return { state, username, email, nationalcode, avatar };
    }

    async updateProfile(updateDto: UpdateProfileDto, userDto: GetUserDto): Promise<UpdateProfileResultDto> {
        let { id } = userDto;
        let message = '', state = false;
        let user = await this.userService.getUserById(id);
        let existUser = await this.userService.getUser({
            $and: [
                { $or: [{ username: updateDto.username }, { email: updateDto.email }, { nationalcode: updateDto.nationalcode }] },
                { _id: { $ne: id } }
            ]
        });

        if (!existUser) {
            await user.updateOne(updateDto);
            // * unlink oldest avatar from storage
            if (updateDto.avatar) {
                try {
                    let oldAvatarPath = `./public/uploads/avatars/${user.avatar}`;
                    if (fs.existsSync(oldAvatarPath)) {
                        fs.unlinkSync(oldAvatarPath);
                    }
                } catch (error) { }
            }
            state = true;
            message = 'update_success';
        } else {
            message = 'already_information_used';
        }

        return { state, message: this.languageService.get(message) };
    }
}