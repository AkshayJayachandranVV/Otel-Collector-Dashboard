import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MetricsService } from './metrics.service';
import * as client from 'prom-client';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

}
