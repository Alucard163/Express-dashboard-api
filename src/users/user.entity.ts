import { compare, hash } from 'bcryptjs';

export class User {
    private _password: string;

    constructor(
        private readonly _email: string,
        public readonly _name: string,
        public passHash?: string,
    ) {
        if (passHash) {
            this._password = passHash;
        }
    }

    get email():string {
        return this.email;
    }

    get name(): string {
        return this.name;
    }

    get password(): string {
        return this._password;
    }

    public async setPassword(pass: string, salt: number) {
        this._password = await hash(pass, salt);
    }

    public async comparePassword(pass: string): Promise<boolean> {
        return compare(pass, this._password);
    }
}