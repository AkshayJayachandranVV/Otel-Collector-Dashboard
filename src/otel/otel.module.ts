import { Module } from '@nestjs/common';
import { OtelCollector } from './otel';

@Module({
  providers: [OtelCollector],
  exports: [OtelCollector],
})
export class OtelModule {}