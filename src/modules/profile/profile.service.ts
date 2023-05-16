import fs from "fs";
import _ from "lodash";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { I18nService } from "nestjs-i18n";
import { IProfileResult } from "./interface/profile.interface";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private i18nService: I18nService
    ) { }

    async getProfileById(id: string): Promise<IProfileResult> {
        let user = await this.userService.getUserById(id);
        return user ? {
            username: user.username,
            email: user.email,
            nationalcode: user.nationalcode,
            avatar: user.avatar
        } : null;
    }

    async updateProfile(id: string, updateDto: UpdateProfileDto): Promise<{ state: boolean, message: string }> {
        let message = 'already_information_used', state = false;
        let user = await this.userService.getUserById(id);
        let existUser = await this.userService.getOneUser({
            $and: [
                { $or: [{ username: updateDto.username }, { email: updateDto.email }, { nationalcode: updateDto.nationalcode }] },
                { _id: { $ne: id } }
            ]
        });

        if (!existUser && user) {
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
        }

        return { state, message: this.i18nService.t(`profile.${message}`) };
    }
}