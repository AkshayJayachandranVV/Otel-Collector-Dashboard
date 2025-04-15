import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { OtelCollector } from './otel/otel';

@Injectable()
export class AppService {
  constructor(private otelCollector: OtelCollector) {}

  readLargeJsonFile(): any {
    const route = '/read-large-file';
    const method = 'GET';

    const start = Date.now(); // Start tracking time
    this.otelCollector.trackRequest(route, method); // Count request

    try {
      const filePath = join(process.cwd(), 'src', 'assets', 'large_dummy_file.json');
      const fileContents = readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } catch (error) {
      console.error('Error reading file:', error);
      return { error: 'Failed to read file' };
    } finally {
      const duration = Date.now() - start; // Calculate duration
      this.otelCollector.trackResponseTime(duration, route, method); // Track latency
    }
  }


  logger(){
    try {
      console.log("logger")
      return "success"
    } catch (error) {
      console.log(error)
    }
  }


  test(){
    try {
      for(let i=0;i<0;i++){

      }
      return 'test done'
    } catch (error) {
      console.log(error)
    }
  }

}
