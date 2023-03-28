import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 40
        }),
        MongooseModule.forRoot(process.env.DB_URI, {
            dbName: process.env.DB_NAME
        }),
        UserModule,
        AuthModule
    ],
})
export class AppModule { }