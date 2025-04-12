// import { NodeSDK } from '@opentelemetry/sdk-node';
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
// import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
// import { MeterProvider } from '@opentelemetry/sdk-metrics';
// import { Resource } from '@opentelemetry/resources';



// export class OtelCollector {
 
//   constructor(){}


//    metricExporter = new OTLPMetricExporter({
//     url: 'http://localhost:4318/v1/metrics', 
//   });
  
//    resource = new Resource({
//     [ATTR_SERVICE_NAME]: 'Akshay',
//   });


//   const prometheusExporter = new PrometheusExporter({
//     port: 9464,
//   });
//   prometheusExporter.startServer();

  
//    meterProvider = new MeterProvider({
//     resource: this.resource,
//     readers: [new PeriodicExportingMetricReader({ exporter: this.metricExporter, exportIntervalMillis: 5000 })],
//   });

//  public getMeter() {
//   return this.meterProvider
//  }


// }


import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

export class OtelCollector {
  private meterProvider: MeterProvider;

  constructor() {
    const resource = new Resource({
      [ATTR_SERVICE_NAME]: 'Akshay',
    });

    // Exporter to OpenTelemetry Collector
    const otlpExporter = new OTLPMetricExporter({
      url: 'http://127.0.0.1:4318/v1/metrics',
    });

    // Exporter for Prometheus scraping
    const prometheusExporter = new PrometheusExporter({
      port: 9464,
      endpoint: '/metrics',
    }, () => {
      console.log('✅ Prometheus scrape endpoint: http://localhost:9464/metrics');
    });

    prometheusExporter.startServer();
    console.log('✅ Prometheus metrics server started on http://localhost:9464');



    this.meterProvider = new MeterProvider({
      resource,
      readers: [
        new PeriodicExportingMetricReader({
          exporter: otlpExporter,
          exportIntervalMillis: 1000,
        }),
        prometheusExporter, // PrometheusExporter is also a MetricReader
      ],
    });
  }

  public getMeter(): ReturnType<MeterProvider['getMeter']> {
    return this.meterProvider.getMeter('otel-default');
  }
}
