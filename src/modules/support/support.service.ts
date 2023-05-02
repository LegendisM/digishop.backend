import _ from "lodash";
import mongoose, { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Support } from "./schema/support.schema";
import { CreateSupportDto } from "./dto/create-support.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { ISupport } from "./interface/support.interface";
import { FindOneSupportDto, FindOneSupportResultDto, FindAllSupportsResultDto } from "./dto/find-support.dto";
import { Role } from "../user/interface/role.interface";

@Injectable()
export class SupportService {
    constructor(
        @InjectModel(Support.name) private supportModel: Model<Support>
    ) { }

    async create(createDto: CreateSupportDto, userDto: GetUserDto): Promise<ISupport> {
        let { _id } = userDto;
        return await this.supportModel.create({
            owner: _id,
            messages: [{ owner: _id, subject: createDto.subject, content: createDto.content }]
        });
    }

    async findById(findOneDto: FindOneSupportDto, userDto: GetUserDto): Promise<FindOneSupportResultDto> {
        let support = await this.supportModel.findById(findOneDto.id);
        if (support && !userDto._id.equals(support.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return { support };
    }

    async findAll(userDto?: GetUserDto): Promise<FindAllSupportsResultDto> {
        let supports = await this.supportModel.find({
            owner: (mongoose.isValidObjectId(userDto?._id) ? userDto._id : { $ne: null })
        }).sort({ updatedAt: -1 });
        return {
            supports
        };
    }
}