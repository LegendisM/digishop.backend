import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { LanguageModule } from "../language/language.module";
import { AuthLanguageStorage } from "./auth.language";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        LanguageModule.register(AuthLanguageStorage),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30 days'
                }
            }),
            inject: [ConfigService],
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