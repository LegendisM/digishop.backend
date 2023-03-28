/**
 * @description import environment
 */
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}.local`) });

/**
 * @description import base
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';

/**
 * @description application startup
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * config
  app.setGlobalPrefix("/api");
  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe());

  // * middlewares
  app.use(helmet());

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(process.env.MAIN_PORT);
}
bootstrap();
