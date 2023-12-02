import { Response, Request, NextFunction } from 'express';
import { IExceptionFilter } from './exeption.filter.interface';
import { HttpErrorClass } from './http-error.class';
import { inject, injectable } from 'inversify';
import { Ilogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: Ilogger) {}
	catch(err: Error | HttpErrorClass, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpErrorClass) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
