import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { ProductModule } from "../product/product.module";
import { SupportModule } from "../support/support.module";
import { ProfileModule } from "../profile/profile.module";
import { PolicyModule } from "../policy/policy.module";
import { TagModule } from "../tag/tag.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env'
        }),
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 40
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        PolicyModule,
        ProfileModule,
        TagModule,
        ProductModule,
        SupportModule
    ],
})
export class AppModule { }