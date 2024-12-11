import { IUserService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, password, name }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);

		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return false;
	}

}