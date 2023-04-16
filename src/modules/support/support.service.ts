import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SupportModel } from "./support.model";
import { CreateSupportDto } from "./dto/create-support.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import _ from "lodash";

@Injectable()
export class SupportService {
    constructor(
        @InjectModel(SupportModel.name) private supportModel: Model<SupportModel>
    ) { }

    async create(dto: CreateSupportDto, user: GetUserDto): Promise<SupportModel> {
        let support = await this.supportModel.create({ owner: user.id });
        support.messages.push({ owner: user._id, subject: dto.subject, content: dto.content });
        return support.save();
    }
}