import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { OtelCollector } from './otel/otel';


@Injectable()
export class AppService {

  private counter;
  constructor(private otel : OtelCollector){

    const meter = this.otel.getMeter().getMeter('alpha');
    this.counter = meter.createCounter('read_json_file_total', {
      description: 'Total times large JSON file is read',
    });

  }

  getHello(): string {
    return 'Hello World!';
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
