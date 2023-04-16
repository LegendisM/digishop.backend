import { Module } from "@nestjs/common";
import { SupportService } from "./support.service";
import { SupportController } from "./support.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SupportModel, SupportSchema } from "./support.model";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: SupportModel.name,
            schema: SupportSchema
        }]),
    ],
    controllers: [SupportController],
    providers: [SupportService],
    exports: [SupportService]
})
export class SupportModule { }