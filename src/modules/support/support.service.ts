import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Support } from "./schema/support.schema";
import { CreateSupportDto } from "./dto/create-support.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import _ from "lodash";
import { ISupport } from "./interface/support.interface";

@Injectable()
export class SupportService {
    constructor(
        @InjectModel(Support.name) private supportModel: Model<Support>
    ) { }

    async create(createDto: CreateSupportDto, userDto: GetUserDto): Promise<ISupport> {
        let { _id, id } = userDto;
        return await this.supportModel.create({
            owner: id,
            messages: [{ owner: _id, subject: createDto.subject, content: createDto.content }]
        });
    }
}