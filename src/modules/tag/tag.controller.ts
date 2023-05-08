import { Controller, Delete, Get, Post } from "@nestjs/common";
import { TagService } from "./tag.service";
import { BaseResponseResultDto } from "src/common/dto/base-response.dto";
import { ITag } from "./interface/tag.interface";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { CreateTagDto } from "./dto/create-tag.dto";
import { IdentifierDto } from "src/common/dto/identifier.dto";

@Controller({
    path: 'tag',
    version: '1'
})
export class TagController {
    constructor(
        private tagService: TagService
    ) { }

    @Get()
    async findAll(): Promise<BaseResponseResultDto<ITag[]>> {
        let tags = await this.tagService.findAll();
        return {
            data: tags
        };
    }

    @Post()
    @Roles(Role.ADMIN)
    async create(
        createDto: CreateTagDto
    ): Promise<BaseResponseResultDto<ITag>> {
        let tag = await this.tagService.create(createDto);
        return {
            state: !!tag,
            data: tag
        }
    }

    @Delete()
    @Roles(Role.ADMIN)
    async delete(
        deleteDto: IdentifierDto
    ): Promise<BaseResponseResultDto<ITag>> {
        let tag = await this.tagService.delete(deleteDto.id);
        return {
            state: !!tag,
            data: tag
        }
    }
}