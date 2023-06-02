import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TagService } from "./tag.service";
import { IResponseResult } from "src/common/interface/response.interface";
import { ITag } from "./interface/tag.interface";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { CreateTagDto } from "./dto/create-tag.dto";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('tags')
@Controller({
    path: '/tags',
    version: '1'
})
export class TagController {
    constructor(
        private tagService: TagService
    ) { }

    @Get('/')
    async getTags(): Promise<IResponseResult<ITag[]>> {
        let tags = await this.tagService.findAll();
        return {
            state: true,
            data: tags
        };
    }

    @Post('/')
    @Roles(Role.ADMIN)
    async createTag(
        @Body() createDto: CreateTagDto
    ): Promise<IResponseResult<ITag>> {
        let tag = await this.tagService.create(createDto);
        return {
            state: !!tag,
            data: tag
        }
    }

    @Delete('/:id')
    @Roles(Role.ADMIN)
    async deleteTag(
        @Param() { id }: IdentifierDto
    ): Promise<IResponseResult<ITag>> {
        let tag = await this.tagService.delete(id);
        return {
            state: !!tag,
            data: tag
        }
    }
}