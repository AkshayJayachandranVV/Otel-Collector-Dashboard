// src/logger/nest-winston-logger.service.ts
import { LoggerService } from '@nestjs/common';
import { logger } from './winston.logger';

export class NestWinstonLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace?: string) {
    logger.error(message + (trace ? `\nTrace: ${trace}` : ''));
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug?(message: string) {
    logger.debug?.(message);
  }

  verbose?(message: string) {
    logger.verbose?.(message);
  }
}
