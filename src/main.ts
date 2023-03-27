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
import cookie from "cookie-parser";
import session from "express-session";
import flash from "express-flash";

/**
 * @description application startup
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookie());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());
  app.use(helmet());

  app.useStaticAssets(path.join(__dirname, '..', 'public', 'site'));
  app.useStaticAssets(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist'), { prefix: '/bootstrap' });
  app.useStaticAssets(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist'), { prefix: '/jquery' });

  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.MAIN_PORT);
}
bootstrap();
