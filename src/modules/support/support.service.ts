import _ from "lodash";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Support } from "./schema/support.schema";
import { CreateSupportDto } from "./dto/create-support.dto";
import { ISupport } from "./interface/support.interface";

@Injectable()
export class SupportService {
    constructor(
        @InjectModel(Support.name) private supportModel: Model<Support>
    ) { }

    async create(createDto: CreateSupportDto, owner: string): Promise<ISupport> {
        return await this.supportModel.create({
            owner,
            messages: [{ owner, subject: createDto.subject, content: createDto.content }]
        });
    }

    async findAll(): Promise<ISupport[]> {
        return await this.supportModel.find().sort({ updatedAt: -1 });
    }

    async findById(id: string): Promise<ISupport> {
        return await this.supportModel.findById(id);
    }

    async findByOwner(owner: string): Promise<ISupport[]> {
        return await this.supportModel.find({ owner });
    }
}