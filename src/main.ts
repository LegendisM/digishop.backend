import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * config
  const configService = app.get(ConfigService);

  // * settings
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // * middlewares
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));

  // * static assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), { index: false, prefix: '/public' })

  await app.listen(configService.get<number>('MAIN_PORT'));
}
bootstrap();