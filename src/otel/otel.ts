import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Meter, Counter, Histogram } from '@opentelemetry/api';

export class OtelCollector {
  private meterProvider: MeterProvider;
  private meter: Meter;
  private requestCounter: Counter;
  private responseTimeHistogram: Histogram;

  constructor() {
    const resource = new Resource({
      [ATTR_SERVICE_NAME]: 'Akshay',
    });

    const otlpExporter = new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics',
    });

    this.meterProvider = new MeterProvider({
      resource,
      readers: [
        new PeriodicExportingMetricReader({
          exporter: otlpExporter,
          exportIntervalMillis: 1000,
        }),
      ],
    });

    this.meter = this.meterProvider.getMeter('otel-default');

    // Counter: Number of requests
    this.requestCounter = this.meter.createCounter('mock_json_request', {
      description: 'Counts total /read-large-file requests',
    });

    // Histogram: Response time in milliseconds
    this.responseTimeHistogram = this.meter.createHistogram('response_time_ms', {
      description: 'Tracks the response time of /read-large-file in ms',
      unit: 'ms',
    });
  }

  public trackRequest(route: string, method: string) {
    this.requestCounter.add(1, { route, method });
  }

  public trackResponseTime(durationInMs: number, route: string, method: string) {
    this.responseTimeHistogram.record(durationInMs, { route, method });
  }

  public getCounter() {
    return this.requestCounter;
  }
}