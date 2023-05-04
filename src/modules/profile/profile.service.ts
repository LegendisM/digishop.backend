import fs from "fs";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { FindProfileResultDto } from "./dto/find-profile.dto";
import { UpdateProfileDto, UpdateProfileResultDto } from "./dto/update-profile.dto";
import { LanguageService } from "../language/language.service";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private languageService: LanguageService
    ) { }

    async find(id: string): Promise<FindProfileResultDto> {
        let username = '', email = '', nationalcode = '', avatar = '', state = false;
        let user = await this.userService.findById(id);
        if (user) {
            username = user.username;
            email = user.email;
            nationalcode = user.nationalcode;
            avatar = user.avatar;
            state = true;
        }
        return { state, username, email, nationalcode, avatar };
    }

    async update(updateDto: UpdateProfileDto, id: string): Promise<UpdateProfileResultDto> {
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