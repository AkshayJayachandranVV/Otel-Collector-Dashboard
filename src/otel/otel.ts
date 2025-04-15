import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Meter, Counter, Histogram } from '@opentelemetry/api';
import { Logger } from '@nestjs/common';

export class OtelCollector {
  private slowestApiHistogram: Histogram;
  private meterProvider: MeterProvider;
  private meter: Meter;
  private requestCounter: Counter;
  private responseTimeHistogram: Histogram;
  private totalResponseTimeHistogram: Histogram; // New histogram for total time

  constructor() {
    try {
      const resource = new Resource({
        [ATTR_SERVICE_NAME]: 'Akshay',
      });

      const otlpExporter = new OTLPMetricExporter({
        url: 'http://localhost:4318/v1/metrics',
        concurrencyLimit: 10, 
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

      this.responseTimeHistogram = this.meter.createHistogram('response_time_ms', {
        description: 'Tracks the server processing time in ms',
        unit: 'ms',
      });

      this.totalResponseTimeHistogram = this.meter.createHistogram('total_response_time_ms', {
        description: 'Tracks the total response time including network latency in ms',
        unit: 'ms',
      });

      this.slowestApiHistogram = this.meter.createHistogram('api_response_time_internal_ms', {
        description: 'Tracks response time of ALL routes internally to find slowest API',
        unit: 'ms',
      });

    } catch (error) {
      Logger.error('OpenTelemetry initialization failed:', error);
    }
  }

  public trackRequest(route: string, method: string) {
    try {
      this.requestCounter?.add(1, { route, method });
    } catch (error) {
      Logger.error('Error tracking request:', error);
    }
  }

  public trackResponseTime(durationInMs: number, route: string, method: string) {
    try {
      this.responseTimeHistogram?.record(durationInMs, { route, method });
    } catch (error) {
      Logger.error('Error tracking response time:', error);
    }
  }

  public trackTotalResponseTime(durationInMs: number, route: string, method: string) {
    try {
      this.totalResponseTimeHistogram?.record(durationInMs, { route, method });
    } catch (error) {
      Logger.error('Error tracking total response time:', error);
    }
  }

  public trackInternalResponseTime(durationInMs: number, route: string, method: string) {
    try {
      this.slowestApiHistogram?.record(durationInMs, { route, method });
    } catch (error) {
      Logger.error('Error tracking internal response time:', error);
    }
  }

  public getCounter() {
    return this.requestCounter;
  }
}