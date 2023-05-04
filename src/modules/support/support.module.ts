import { Module } from "@nestjs/common";
import { SupportService } from "./support.service";
import { SupportController } from "./support.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Support, SupportSchema } from "./schema/support.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Support.name,
            schema: SupportSchema
        }]),
    ],
    controllers: [SupportController],
    providers: [SupportService],
    exports: [
        SupportService,
        MongooseModule
    ]
})
export class SupportModule { }