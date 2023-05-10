import fs from "fs";
import _ from "lodash";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private i18nService: I18nService
    ) { }

    async getProfileById(id: string): Promise<object> {
        let user = await this.userService.getUserById(id);
        return user ? _.pick(user, ['username', 'email', 'nationalcode', 'avatar']) : null;
    }

    async updateProfile(updateDto: UpdateProfileDto, id: string): Promise<{ state: boolean, message: string }> {
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