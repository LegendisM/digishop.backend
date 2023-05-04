import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { IProduct } from "./interface/product.interface";
import { FindProdcutsDto, FindProdcutsResultDto } from "./dto/find-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CompressedFile } from "src/common/decorator/compress.decorator";

@Controller({
    path: 'product',
    version: '1'
})
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Post('find')
    @HttpCode(HttpStatus.OK)
    async findAll(@Body() findDto: FindProdcutsDto): Promise<FindProdcutsResultDto> {
        return await this.productService.findAll(findDto);
    }

    @Post()
    @Roles(Role.ADMIN, Role.MODERATOR)
    @UseInterceptors(FileInterceptor('cover'))
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createDto: CreateProductDto,
        @User() userDto: GetUserDto,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: true,
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1000 * 8 }),
                    new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
                ],
            }),
        )
        @CompressedFile({ width: 800, quality: 80 })
        cover: Express.Multer.File
    ): Promise<IProduct> {
        createDto.cover = cover.filename;
        return await this.productService.create(createDto, userDto);
    }

    @Put()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async update(@Body() updateDto: UpdateProductDto, @User() userDto: GetUserDto): Promise<{ state: boolean }> {
        let state = await this.productService.update(updateDto, userDto);
        return { state: !!state };
    }

    @Delete()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async delete(@Body() deleteDto: DeleteProductDto, @User() userDto: GetUserDto): Promise<{ state: boolean }> {
        let state = await this.productService.delete(deleteDto, userDto);
        return { state: !!state };
    }
}