// src/common/interceptors/slowest-api.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap, catchError } from 'rxjs/operators';
  import { OtelCollector } from '../../otel/otel';
  import { Logger } from '@nestjs/common';
  
  @Injectable()
  export class SlowestApiInterceptor implements NestInterceptor {
    constructor(private readonly otelCollector: OtelCollector) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const start = Date.now();
      const req = context.switchToHttp().getRequest();
  
      const method = req.method ?? 'UNKNOWN_METHOD';
      const route = req.route?.path || req.url || 'UNKNOWN_ROUTE';
  
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - start;
          try {
            this.otelCollector?.trackInternalResponseTime(duration, route, method);
          } catch (error) {
            Logger.warn(`Failed to track internal response time: ${error?.message}`);
          }
        }),
        catchError((err) => {
          const duration = Date.now() - start;
          try {
            this.otelCollector?.trackInternalResponseTime(duration, route, method);
          } catch (error) {
            Logger.warn(`Failed to track error response time: ${error?.message}`);
          }
          throw err; // rethrow the error after tracking
        }),
      );
    }
  }
  