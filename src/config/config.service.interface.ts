export interface IConfigService {
	get: (salt: string) => string;
}