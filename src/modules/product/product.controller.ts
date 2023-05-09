import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ForbiddenException, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { IProduct, IProductList } from "./interface/product.interface";
import { GetProductsFilterDto } from "./dto/get-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../user/decorator/user.decorator";
import { GetUserDto } from "../user/dto/get-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CompressedFile } from "src/common/decorator/compress.decorator";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { IResponseResult } from "src/common/interface/response.interface";

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
    async getProducts(
        @Body() filterDto: GetProductsFilterDto
    ): Promise<IResponseResult<IProductList>> {
        let products = await this.productService.getProducts(filterDto);
        return {
            data: products
        };
    }

    @Get('find/:id')
    async getProductById(
        @Param() filterDto: IdentifierDto
    ): Promise<IResponseResult<IProduct>> {
        let product = await this.productService.getProductById(filterDto.id);
        return {
            state: !!product,
            data: product
        }
    }

    @Post()
    @Roles(Role.ADMIN, Role.MODERATOR)
    @UseInterceptors(FileInterceptor('cover'))
    @HttpCode(HttpStatus.CREATED)
    async createProduct(
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
    ): Promise<IResponseResult<IProduct>> {
        createDto.cover = cover.filename;
        let product = await this.productService.createProduct(createDto, userDto.id);
        return {
            state: !!product,
            data: product
        };
    }

    @Put()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async updateProduct(
        @Body() updateDto: UpdateProductDto,
        @User() userDto: GetUserDto
    ): Promise<IResponseResult<boolean>> {
        let product = await this.productService.getProductById(updateDto.id);
        // * check policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Update, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.updateProduct(updateDto);
        return {
            state: !!product,
            data: !!product
        };
    }

    @Delete()
    @Roles(Role.ADMIN, Role.MODERATOR)
    async deleteProduct(
        @Body() deleteDto: IdentifierDto,
        @User() userDto: GetUserDto
    ): Promise<IResponseResult<boolean>> {
        let product = await this.productService.getProductById(deleteDto.id);
        // * ckeck policy
        if (this.policyFactory.userAbility(userDto).cannot(PolicyAction.Delete, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.deleteProduct(deleteDto.id);
        return {
            state: !!product,
            data: !!product
        };
    }
}