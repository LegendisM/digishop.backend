import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "./user.model";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./guard/roles.guard";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: UserModel.name,
            schema: UserSchema
        }]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }