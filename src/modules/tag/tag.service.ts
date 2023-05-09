import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tag } from "./schema/tag.schema";
import { Model } from "mongoose";
import { ITag } from "./interface/tag.interface";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name) private tagModel: Model<Tag>
    ) { }

    async createTag(createDto: CreateTagDto): Promise<ITag> {
        return await this.tagModel.create(createDto);
    }

    async getTags(): Promise<ITag[]> {
        return await this.tagModel.find();
    }

    async getTagById(id: string): Promise<ITag> {
        return await this.tagModel.findById(id);
    }

    async getTagsByNames(names: string[]): Promise<ITag[]> {
        return await this.tagModel.find({ name: { $in: names } });
    }

    async deleteTag(id: string): Promise<ITag> {
        let tag = await this.getTagById(id);
        return tag ? await tag.deleteOne() : null;
    }
}