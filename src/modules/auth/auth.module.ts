import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { LanguageModule } from "../language/language.module";
import { AuthLanguageStorage } from "./auth.language";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        LanguageModule.register(AuthLanguageStorage),
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30 days' }
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService]
})
export class AuthModule { }