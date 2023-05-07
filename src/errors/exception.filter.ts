import {Response, Request, NextFunction} from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HttpErrorClass } from "./http-error.class";

export class ExceptionFilter implements IExeptionFilter {
    logger: LoggerService;
    constructor(logger: LoggerService) {
        this.logger = logger;
    }
    catch(err: Error | HttpErrorClass, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpErrorClass) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({ err: err.message });
        }

    }
}