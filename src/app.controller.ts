import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import axios from "axios"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/read-large-file')
  readLargeJsonFile() {
    // Track the actual request for this endpoint
    return this.appService.readLargeJsonFile();
  }


  @Get('/read-multi-file')
  readLarge2Times() {
    // Track the actual request for this endpoint
    return this.appService.readLarge2Times();
  }

 
  @Get('heavy-task')
  async heavyTask() {
    try {
      const result = await this.appService.HeavyTask();
      return { success: true, result };
    } catch (error) {
      Logger.error('Error in /heavy-task', error);
      return { success: false, message: 'Internal Server Error' };
    }
  }
  

  @Get('logger')
  logger() {
    try {
      return this.appService.logger();
    } catch (error) {
      Logger.error('Error in /logger', error);
      return { success: false, message: 'Internal Server Error' };
    }
  }
  

  @Get('test')
  test() {
    try {
      return this.appService.test();
    } catch (error) {
      Logger.error('Error in /test', error);
      return { success: false, message: 'Internal Server Error' };
    }
  }
  
}
