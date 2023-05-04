import _ from "lodash";
import { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Support } from "./schema/support.schema";
import { CreateSupportDto } from "./dto/create-support.dto";
import { GetUserDto } from "../user/dto/get-user.dto";
import { ISupport } from "./interface/support.interface";
import { FindSupportDto, FindSupportResultDto, FindSupportsResultDto } from "./dto/find-support.dto";
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

    async findAll(): Promise<FindSupportsResultDto> {
        let supports = await this.supportModel.find().sort({ updatedAt: -1 });
        return {
            supports
        };
    }

    async findById(findOneDto: FindSupportDto, userDto: GetUserDto): Promise<FindSupportResultDto> {
        let support = await this.supportModel.findById(findOneDto.id);
        if (support && !userDto._id.equals(support.owner._id) && !userDto.roles.includes(Role.ADMIN)) {
            throw new ForbiddenException();
        }
        return { support };
    }

    async findByOwner(userDto: GetUserDto): Promise<FindSupportsResultDto> {
        let supports = await this.supportModel.find({ owner: userDto._id });
        return {
            supports
        }
    }
}