import './otel/otel'; 
import { Module,MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseUser } from './database/entities/user.entity';
import { MetricsModule } from './modules/metrics/metrics.module';
import { NestWinstonLogger } from './logger/nest-winston-logger.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { OtelCollector } from './otel/otel';


@Module({
  imports: [UserModule,DatabaseModule,TypeOrmModule.forFeature([ExpenseUser]),MetricsModule],
  controllers: [AppController],
  providers: [AppService, OtelCollector],
})
export class AppModule {
  constructor(){
    const logger = new NestWinstonLogger();
    logger.log('AppModule initialized ');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  
}
