import { createLogger, format, transports } from 'winston';
import winston from 'winston';
const LokiTransport = require('winston-loki');


const { combine, timestamp, printf, json, colorize, simple } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    process.env.NODE_ENV === 'production' ? json() : customFormat
  ),
  defaultMeta: { service: 'nestjs-app' },
  transports: [
    new transports.Console({
      format: combine(colorize(), simple()),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new LokiTransport({
        host: 'http://127.0.0.1:3100',
        labels: {
          job: 'nestjs-logs',
          appName: 'nest js', // 👈 Add this here
        },
        json: true,
        interval: 5,
      }),,
  ],
});
