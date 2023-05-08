import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TagService } from "./tag.service";
import { Tag, TagSchema } from "./schema/tag.schema";
import { TagController } from "./tag.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Tag.name,
            schema: TagSchema
        }]),
    ],
    controllers: [TagController],
    providers: [TagService],
    exports: [
        TagService,
        MongooseModule
    ]
})
export class TagModule { }