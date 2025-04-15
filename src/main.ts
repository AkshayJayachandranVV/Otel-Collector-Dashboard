// src/main.ts
import './otel/otel';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestWinstonLogger } from './logger/nest-winston-logger.service';
import { SlowestApiInterceptor } from './common/interceptors/slowest-api.interceptor';
import { OtelCollector } from './otel/otel';
import { Logger } from '@nestjs/common';
import { OtelResponseTimeInterceptor } from './otel/otel-response-time.interceptor';


async function bootstrap() {
  const logger = new NestWinstonLogger();
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  try {
    const otelCollector = new OtelCollector();
    app.useGlobalInterceptors(new SlowestApiInterceptor(otelCollector));
    app.useGlobalInterceptors(new OtelResponseTimeInterceptor(otelCollector));

  } catch (error) {
    logger.error('OtelCollector failed to initialize:', error);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
