import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { Ilogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private readonly config: DotenvConfigOutput;

	constructor(
		@inject(TYPES.ILogger) private logger: Ilogger,
	) {
			const result: DotenvConfigOutput = config();

			if (result.error) {
				this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
			} else {
				this.logger.log('[ConfigService] Конфигурация .env загружена');
				this.config = result.parsed as DotenvParseOutput;
			}
	}
	get(key: string): string {
		return this.config[key];
	}

}