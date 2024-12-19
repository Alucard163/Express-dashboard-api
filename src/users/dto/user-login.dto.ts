import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsString({ message: 'Invalid password' })
    password: string;
}