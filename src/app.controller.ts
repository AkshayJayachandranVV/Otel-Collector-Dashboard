import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import axios from "axios"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }



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
  HeavyTask(){
    try {
      this.appService.HeavyTask()
    } catch (error) {
      console.log(error)
    }
  }


  @Get('logger')
  logger(){
    return this.appService.logger()
  }


  @Get('test')
  test(){
    return this.appService.test()
  }



  

//  @Get('fetch-many')
//  async fetchMany() {
//       for (let i = 0; i< 100; i++) {
//         try {
//           await axios.get('http://localhost:7200/read-large-file')
//         } catch (error) {
//           Logger.log(error)
//         }
//       }
//  }
  
}
