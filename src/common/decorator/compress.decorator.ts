import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { extname } from "path";
import sharp, { FormatEnum } from "sharp";

export const CompressedFile = createParamDecorator(
    async (
        option: { width: number, quality: number, compressionLevel: number } = { width: 800, quality: 80, compressionLevel: 8 },
        context: ExecutionContext
    ) => {
        const request = context.switchToHttp().getRequest();
        const file: Express.Multer.File = request.file;

        if (!file || !file.path || !file.mimetype.startsWith('image/')) {
            return file;
        }

        const extension = extname(file.originalname).replace('.', '');

        try {
            const buffer = await sharp(file.path)
                .resize(option.width)
                .toFormat(extension as keyof FormatEnum, { quality: option.quality, compressionLevel: option.compressionLevel })
                .toBuffer();
            await sharp(buffer).toFile(file.path);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return file;
    }
);