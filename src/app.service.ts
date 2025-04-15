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

    console.log("enetered")

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
    }
  }

  readLarge2Times() {
    try {
      console.log("2 Times file read");
      const filePath = join(process.cwd(), 'src', 'assets', 'large_dummy_file.json');
      const fileContents = readFileSync(filePath, 'utf8');
      const fileContents2 = readFileSync(filePath, 'utf8'); // Consider optimizing this
      return JSON.parse(fileContents);
    } catch (error) {
      console.error('Error in readLarge2Times:', error);
      return { error: 'Failed to read file twice' };
    }
  }


  logger() {
    try {
      console.log("logger");
      return "success";
    } catch (error) {
      console.error('Error in logger:', error);
      return { error: 'Logger failed' };
    }
  }
  
  test() {
    try {
      return 'test done';
    } catch (error) {
      console.error('Error in test:', error);
      return { error: 'Test failed' };
    }
  }
  


  async HeavyTask() {
    try {
      const limit = 100000;
      const primes: number[] = [];
  
      for (let num = 2; num <= limit; num++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) primes.push(num);
      }
  
      console.log(`Found ${primes.length} prime numbers up to ${limit}`);
      return primes.length;
    } catch (error) {
      console.error('Error in HeavyTask:', error);
      return 0;
    }
  }


}
