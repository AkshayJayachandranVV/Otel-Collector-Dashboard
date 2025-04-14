import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { OtelCollector } from './otel/otel';
import { Counter } from '@opentelemetry/api';


@Injectable()
export class AppService {
  private counter: Counter;
  constructor(private otel: OtelCollector) {}

  readLargeJsonFile(): any {
    const counter = this.otel.getCounter();
    counter.add(1, {
      route: '/read-large-file',
      method: 'GET',
    });

    const filePath = join(process.cwd(), 'src', 'assets', 'large_dummy_file.json');
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }

}

