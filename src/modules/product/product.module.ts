import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/product.schema";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { uniqueSuffix } from "src/common/helpers/random.helper";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Product.name,
            schema: ProductSchema
        }]),
        MulterModule.register({
            storage: diskStorage({
                destination: './public/uploads/products',
                filename: (req, file, cb) => {
                    let extension = extname(file.originalname);
                    cb(null, uniqueSuffix(extension));
                },
            })
        }),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [
        ProductService,
        MongooseModule
    ]
})
export class ProductModule { }