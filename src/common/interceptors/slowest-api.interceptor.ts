// src/common/interceptors/slowest-api.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { OtelCollector } from '../../otel/otel';
  
  @Injectable()
  export class SlowestApiInterceptor implements NestInterceptor {
    constructor(private readonly otelCollector: OtelCollector) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const start = Date.now();
      const req = context.switchToHttp().getRequest();
  
      const method = req.method;
      const route = req.route?.path || req.url;
  
      return next.handle().pipe(
        tap(() => {
          const duration = Date.now() - start;
          this.otelCollector.trackInternalResponseTime(duration, route, method); // ✅ only internal metric
        }),
      );
    }
  }
  