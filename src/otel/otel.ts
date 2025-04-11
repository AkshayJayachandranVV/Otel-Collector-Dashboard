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




import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';

export class OtelCollector {
  private meterProvider: MeterProvider;

  constructor() {
    
    const resource = new Resource({
      [ATTR_SERVICE_NAME]: 'Akshay',
    });

    const otlpExporter = new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics',
    });
  
    const prometheusExporter = new PrometheusExporter({ port: 9464 });
    prometheusExporter.startServer();


    // Setup MeterProvider with both exporters
  this.meterProvider = new MeterProvider({
    resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: otlpExporter,
        exportIntervalMillis: 1000,
      }),
      prometheusExporter,
    ],
  });

  }

  public getMeter(): MeterProvider {
    return this.meterProvider;
  }
}