// metrics.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Histogram } from 'prom-client';
  
  const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5] 
  });


  @Injectable()
  export class MetricsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const route = request.route?.path || request.url;
  
      const end = httpRequestDurationMicroseconds.startTimer();
  
      return next.handle().pipe(
        tap((res) => {
          const response = context.switchToHttp().getResponse();
          end({ method, route, status_code: response.statusCode });
        })
      );
    }
  }
  