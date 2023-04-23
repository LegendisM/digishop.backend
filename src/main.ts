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
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from "@nestjs/platform-express";
import compression from "compression";
import helmet from "helmet";

/**
 * @description application startup
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * config
  app.enableCors();
  app.setGlobalPrefix("/api");
  app.enableVersioning({ type: VersioningType.URI })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // * middlewares
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), { index: false, prefix: '/public' });

  await app.listen(process.env.MAIN_PORT);
}
bootstrap();
