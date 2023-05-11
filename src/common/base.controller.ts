import {Response, Router} from "express";
import { IRoute } from "./route.interface";
import { Ilogger } from "../logger/logger.interface";
import {injectable} from "inversify";
import 'reflect-metadata';
export { Router }

// @ts-ignore
@injectable()
export abstract class BaseController {
    private readonly _router: Router;
    protected constructor(private logger: Ilogger) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.sendStatus(code).json(message);
    }

    public ok<T>(res: Response, message: T) {
        return this.send(res, 200, message);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path,handler);
        }


    }

}