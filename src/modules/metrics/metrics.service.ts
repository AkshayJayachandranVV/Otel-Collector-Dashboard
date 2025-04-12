import { Injectable } from '@nestjs/common';
import { OtelCollector } from '../../otel/otel';

@Injectable()
export class MetricsService {
  private meter = new OtelCollector().getMeter();
  private counter = this.meter.createCounter('custom_request_counter', {
    description: 'Counts number of requests',
  });

  constructor() {
    setInterval(() => {
      this.counter.add(1, { route: '/demo' });
      console.log('✅ Counter metric incremented');
    }, 5000);
  }
}
