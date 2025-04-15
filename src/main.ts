import './otel/otel';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestWinstonLogger } from './logger/nest-winston-logger.service';
import { SlowestApiInterceptor } from './common/interceptors/slowest-api.interceptor';
import { OtelCollector } from './otel/otel';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{
    logger: new NestWinstonLogger(),
  });


  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });


  const otelCollector = new OtelCollector();
  app.useGlobalInterceptors(new SlowestApiInterceptor(otelCollector)); // ✅ separate interceptor




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
