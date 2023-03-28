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

/**
 * @description application startup
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * middlewares
  app.use(helmet());

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public', 'site'));

  await app.listen(process.env.MAIN_PORT);
}
bootstrap();
