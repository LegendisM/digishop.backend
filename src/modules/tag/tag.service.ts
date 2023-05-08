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

    async create(createDto: CreateTagDto): Promise<ITag> {
        return await this.tagModel.create(createDto);
    }

    async findAll(): Promise<ITag[]> {
        return await this.tagModel.find();
    }

    async findById(id: string): Promise<ITag> {
        return await this.tagModel.findById(id);
    }

    async findByNames(names: string[]): Promise<ITag[]> {
        return await this.tagModel.find({ name: { $in: names } });
    }

    async delete(id: string): Promise<ITag> {
        let tag = await this.findById(id);
        return tag ? await tag.deleteOne() : null;
    }
}