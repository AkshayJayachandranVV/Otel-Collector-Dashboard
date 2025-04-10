import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MetricsInterceptor } from './modules/metrics/metrics.interceptor';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalInterceptors(new MetricsInterceptor());



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
