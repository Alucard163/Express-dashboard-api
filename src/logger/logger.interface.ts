import { Logger, ILogObj } from 'tslog';

export interface Ilogger {
    logger: Logger<ILogObj>;

    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
}