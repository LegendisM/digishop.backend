import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ForbiddenException, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../user/decorator/role.decorator";
import { Role } from "../user/interface/role.interface";
import { IProduct, IProductList } from "./interface/product.interface";
import { GetProductsFilterDto } from "./dto/get-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CurrentUser } from "../user/decorator/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { CompressedFile } from "src/common/decorator/compress.decorator";
import { PolicyFactory } from "../policy/policy.factory";
import { PolicyAction } from "../policy/interface/policy.interface";
import { IdentifierDto } from "src/common/dto/identifier.dto";
import { IResponseResult } from "src/common/interface/response.interface";
import { ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interface/user.interface";

@ApiTags('products')
@Controller({
    path: '/products',
    version: '1'
})
export class ProductController {
    constructor(
        private productService: ProductService,
        private policyFactory: PolicyFactory
    ) { }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async getProducts(
        @Query() filterDto: GetProductsFilterDto
    ): Promise<IResponseResult<IProductList>> {
        let products = await this.productService.getProducts(filterDto);
        return {
            state: true,
            data: products
        };
    }

    @Get('/:id')
    async getProductById(
        @Param() { id }: IdentifierDto
    ): Promise<IResponseResult<IProduct>> {
        let product = await this.productService.getProductById(id);
        return {
            state: !!product,
            data: product
        }
    }

    @Post('/')
    @Roles(Role.ADMIN, Role.MODERATOR)
    @UseInterceptors(FileInterceptor('cover'))
    @HttpCode(HttpStatus.CREATED)
    async createProduct(
        @Body() createDto: CreateProductDto,
        @CurrentUser() user: IUser,
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
        let product = await this.productService.createProduct(createDto, user.id);
        return {
            state: !!product,
            data: product
        };
    }

    @Put('/:id')
    @Roles(Role.ADMIN, Role.MODERATOR)
    async updateProduct(
        @Param() { id }: IdentifierDto,
        @Body() updateDto: UpdateProductDto,
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<boolean>> {
        let product = await this.productService.getProductById(id);
        // * check policy
        if (this.policyFactory.userAbility(user).cannot(PolicyAction.Update, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.updateProduct(id, updateDto);
        return {
            state: !!product,
            data: !!product
        };
    }

    @Delete('/:id')
    @Roles(Role.ADMIN, Role.MODERATOR)
    async deleteProduct(
        @Param() { id }: IdentifierDto,
        @CurrentUser() user: IUser
    ): Promise<IResponseResult<boolean>> {
        let product = await this.productService.getProductById(id);
        // * ckeck policy
        if (this.policyFactory.userAbility(user).cannot(PolicyAction.Delete, product)) {
            throw new ForbiddenException();
        }
        product = await this.productService.deleteProduct(id);
        return {
            state: !!product,
            data: !!product
        };
    }
}