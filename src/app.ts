import express, { Express } from "express";
import { Server } from "node:http";
import { UserController } from "./users/UsersController";
import { ExceptionFilter } from "./errors/exception.filter";
import {Ilogger} from "./logger/logger.interface";

export class App {
    app: Express;
    server: Server;
    port: Number;
    logger: Ilogger;
    userController: UserController;
    exeptionFilter: ExceptionFilter;
    constructor(
        logger: Ilogger,
        userController: UserController,
        exeptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);

        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}