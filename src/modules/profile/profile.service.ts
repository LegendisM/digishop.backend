import fs from "fs";
import _ from "lodash";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { LanguageService } from "../language/language.service";

@Injectable()
export class ProfileService {
    constructor(
        private userService: UserService,
        private languageService: LanguageService
    ) { }

    async find(id: string): Promise<object> {
        let user = await this.userService.findById(id);
        return user ? _.pick(user, ['username', 'email', 'nationalcode', 'avatar']) : null;
    }

    async update(updateDto: UpdateProfileDto, id: string): Promise<{ state: boolean, message: string }> {
        let message = 'already_information_used', state = false;
        let user = await this.userService.findById(id);
        let existUser = await this.userService.findOne({
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

        return { state, message: this.languageService.get(message) };
    }
}