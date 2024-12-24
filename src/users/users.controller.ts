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
import { UserService } from './users.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register, middleware: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: '/login', method: 'post', func: this.login, middleware: [new ValidateMiddleware(UserLoginDto)] },
			{ path: '/info', method: 'get', func: this.info, middleware: [new AuthGuard()] },
		]);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HttpErrorClass(401, 'Ошибка авторизации', 'login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));

		this.ok(res, { jwt });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HttpErrorClass(422, 'Такой пользователь уже существует'))
		}

		this.ok(res, { email: result.email, id: result.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				sign({
					email,
					iat: Math.floor(Date.now() / 1000),
				},
					secret,
					{
						algorithm: 'HS256'
					},
					(err, token) => {
						if (err) {
							reject(err)
						}

						resolve(token as string);
					})
			})
	}
}
