import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { TagService } from "./tag.service";
import { IResponseResult } from "src/common/interface/response.interface";
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
    async getTags(): Promise<IResponseResult<ITag[]>> {
        let tags = await this.tagService.getTags();
        return {
            data: tags
        };
    }

    @Post()
    @Roles(Role.ADMIN)
    async createTag(
        @Body() createDto: CreateTagDto
    ): Promise<IResponseResult<ITag>> {
        let tag = await this.tagService.createTag(createDto);
        return {
            state: !!tag,
            data: tag
        }
    }

    @Delete()
    @Roles(Role.ADMIN)
    async deleteTag(
        @Body() deleteDto: IdentifierDto
    ): Promise<IResponseResult<ITag>> {
        let tag = await this.tagService.deleteTag(deleteDto.id);
        return {
            state: !!tag,
            data: tag
        }
    }
}