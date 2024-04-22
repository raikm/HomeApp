import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: '*',
  });
  app.use(cookieParser());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: VERSION_NEUTRAL,
  // });

  const port = 5001;

  await app.listen(port);
  console.log(
    `🚀 API Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  // logger.log(
  //   `🚀 API Application is running on: http://localhost:${port}/${globalPrefix}`,
  // );
}

bootstrap();
