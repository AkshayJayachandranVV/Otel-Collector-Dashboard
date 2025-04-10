import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MetricsService } from './metrics.service';
import * as client from 'prom-client';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Res() res: Response): Promise<void> {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(await this.metricsService.getMetrics());
  }
}
