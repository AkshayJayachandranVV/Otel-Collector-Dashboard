import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Meter } from '@opentelemetry/api';

export class OtelCollector {
  private meterProvider: MeterProvider;
  private meter: Meter;
  private requestCounter: ReturnType<Meter['createCounter']>;

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


    this.requestCounter = this.meter.createCounter('mock_json_request', {
      description: 'Counts total /read-large-file requests',
    });
    
  }

  public getCounter() {
    return this.requestCounter;
  }

}
