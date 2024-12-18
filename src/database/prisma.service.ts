import { PrismaClient } from "@prisma/client";
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Ilogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient

	constructor(
		@inject(TYPES.ILogger) private logger: Ilogger
	) {
		this.client = new PrismaClient();
	}


	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.log('[PrismaService] ошибка подключения к базе данных: ' + e.message);
			}
		}

	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}