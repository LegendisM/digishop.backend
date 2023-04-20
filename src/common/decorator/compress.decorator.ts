import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import sharp from 'sharp';

export const CompressedFile = createParamDecorator(
    async (options: { width?: number; quality?: number }, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();

        if (!req.file || !req.file.mimetype.startsWith('image/') || !req.file.path) {
            return req.file;
        }

        try {
            const buffer = await sharp(req.file.path)
                .resize(options?.width || 800)
                .jpeg({ quality: options?.quality || 80 })
                .toBuffer();
            await sharp(buffer).toFile(req.file.path);
        } catch (err) {
            console.error(err);
        }

        return req.file;
    },
);