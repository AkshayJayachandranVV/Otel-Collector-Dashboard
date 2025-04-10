import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseUser } from './database/entities/user.entity';
import { MetricsModule } from './modules/metrics/metrics.module';




@Module({
  imports: [UserModule,DatabaseModule,TypeOrmModule.forFeature([ExpenseUser]),MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
