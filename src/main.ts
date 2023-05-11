import { App } from './app';
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/UsersController";
import { ExceptionFilter } from "./errors/exception.filter";
import {IExceptionFilter} from "./errors/exeption.filter.interface";
import {Container, ContainerModule, interfaces} from "inversify";
import {Ilogger} from "./logger/logger.interface";
import {TYPES} from "./types";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<Ilogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application)

    app.init();

    return { appContainer, app }
}

export const { app, appContainer } = bootstrap();