import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseUser } from '../../database/entities/user.entity';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([ExpenseUser])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
