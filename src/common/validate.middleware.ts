import { IMiddleware } from './middleware.interface';
import e, { NextFunction, Request, Response } from 'express';
import { ClassConstructor, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {
	}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = classToPlain(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
					res.status(422).send(errors);
			} else {
				next();
			}
		});
	}

}