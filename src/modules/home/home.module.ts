import { Module } from "@nestjs/common";
import { HomeContoller } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
    controllers: [HomeContoller],
    providers: [HomeService]
})
export class HomeModule { }