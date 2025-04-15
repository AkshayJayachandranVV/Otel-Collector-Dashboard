// import {
//     CallHandler,
//     ExecutionContext,
//     Injectable,
//     NestInterceptor,
//     Logger,
//   } from '@nestjs/common';
//   import { Observable } from 'rxjs';
//   import { tap } from 'rxjs/operators';
//   import { OtelCollector } from './otel';
    
//   @Injectable()
//   export class OtelResponseTimeInterceptor implements NestInterceptor {
//     private readonly logger = new Logger(OtelResponseTimeInterceptor.name);
    
//     constructor(private readonly otelCollector: OtelCollector) {}
    
//     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//       const now = Date.now();
    
//       const request = context.switchToHttp().getRequest();
//       const route = request.route?.path || request.url;
//       const method = request.method;
      
//       // Get client-reported timing if available (helps align with Postman)
//       const requestStartTime = request.headers['x-request-start'] 
//         ? parseInt(request.headers['x-request-start']) 
//         : now;
    
//       return next.handle().pipe(
//         tap(() => {
//           const endTime = Date.now();
//           const serverDuration = endTime - now;
//           const totalDuration = endTime - requestStartTime;
          
//           // Log both durations for comparison
//           this.logger.debug(
//             `Route ${route} - Server: ${serverDuration}ms, Total: ${totalDuration}ms`
//           );
          
//           // Track server processing time (what you currently have)
//           this.otelCollector.trackResponseTime(serverDuration, route, method);
//           this.otelCollector.trackInternalResponseTime(serverDuration, route, method);
          
//           // Add a separate metric for total duration (closer to Postman)
//           this.otelCollector.trackTotalResponseTime(totalDuration, route, method);
//         }),
//       );
//     }
//   }