import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { OtelCollector } from './otel/otel';


@Injectable()
export class AppService {

  private counter;
  constructor(private otel: OtelCollector) {
    const meter = this.otel.getMeter();
    this.counter = meter.createCounter('read_json_file_total', {
      description: 'Total times large JSON file is read',
    });

    this.otel.recordMetric();

    this.counter = meter.createCounter('read_json_file_total', {
      description: 'Total times large JSON file is read',
    });

  
    // ✅ Safe: only 1 interval starts when service starts
    setInterval(() => {
      this.counter.add(1, { route: '/home' });
    }, 5000);

    
  }



  readLargeJsonFile(): any {
    this.counter.add(1, {
      route: '/read-large-file',
      method: 'GET',
    });
  
    const filePath = join(process.cwd(), 'src', 'assets', 'large_dummy_file.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }


  

}


