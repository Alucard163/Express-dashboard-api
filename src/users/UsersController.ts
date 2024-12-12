import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorClass } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Ilogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';
import 'reflect-metadata';
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from './user.entity';
import { UserService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register, middleware: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: '/login', method: 'post', func: this.login, middleware: [] },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		// this.ok(res, 'login')
		next(new HttpErrorClass(401, 'Ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HttpErrorClass(422, 'Такой пользователь уже существует'))
		}

		this.ok(res, { email: result.email });
	}
}
