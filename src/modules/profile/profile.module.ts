import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { UserModule } from "../user/user.module";
import { LanguageModule } from "../language/language.module";
import { ProfileLanguageStorage } from "./profile.language";

@Module({
    imports: [
        LanguageModule.register(ProfileLanguageStorage),
        UserModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule { }