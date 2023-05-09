import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { UserModule } from "../user/user.module";
import { LanguageModule } from "../language/language.module";
import { ProfileLanguageStorage } from "./profile.language";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { uniqueSuffix } from "src/common/helpers/text.helper";

@Module({
    imports: [
        LanguageModule.register(ProfileLanguageStorage),
        MulterModule.register({
            storage: diskStorage({
                destination: './public/uploads/avatars',
                filename: (req, file, cb) => {
                    let extension = extname(file.originalname);
                    cb(null, uniqueSuffix(extension));
                },
            })
        }),
        UserModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule { }