import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ForbiddenException, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { IProduct, IProductList } from "./interface/product.interface";
import { FindProductsDto } from "./dto/find-product.dto";
import { DeleteProductDto } from "./dto/delete-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CompressedFile } from "src/common/decorator/compress.decorator";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { BaseResponseResultDto } from "src/common/dto/base-response.dto";

@Controller({
    path: 'product',
    version: '1'
})
export class ProductController {
    constructor(
        private productService: ProductService,
        private policyFactory: PolicyFactory
    ) { }

    @Post('find')
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Body() findDto: FindProductsDto
    ): Promise<BaseResponseResultDto<IProductList>> {
        let products = await this.productService.findAll(findDto);
        return {
            data: products
        };
    }

    @Get('find/:id')
    async findById(
        @Param() findDto: IdentifierDto
    ): Promise<BaseResponseResultDto<IProduct>> {
        let product = await this.productService.findById(findDto.id);
        return {
            state: !!product,
            data: product
        }
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
    ): Promise<BaseResponseResultDto<IProduct>> {
        createDto.cover = cover.filename;
        let product = await this.productService.create(createDto, userDto.id);
        return {
            state: !!product,
            data: product
        };
    }

    @Put()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async update(
        @Body() updateDto: UpdateProductDto,
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<IProduct>> {
        let product = await this.productService.findById(updateDto.id);
        // * check policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Update, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.update(updateDto);
        return {
            state: !!product,
            data: product
        };
    }

    @Delete()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async delete(
        @Body() deleteDto: DeleteProductDto,
        @User() userDto: GetUserDto
    ): Promise<BaseResponseResultDto<boolean>> {
        let product = await this.productService.findById(deleteDto.id);
        // * ckeck policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Delete, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.delete(deleteDto);
        return {
            state: !!product,
            data: !!product
        };
    }
}