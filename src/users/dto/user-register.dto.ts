import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsString({ message: 'Invalid password' })
    password: string;

    @IsString({ message: 'Invalid name' })
    name: string;
}