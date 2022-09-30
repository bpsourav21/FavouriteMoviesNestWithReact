import { IsEmail, IsNotEmpty, MinLength, MaxLength, } from 'class-validator';

export class LoggedInDto {
    @IsNotEmpty()
    access_token: string;

    @IsNotEmpty()
    expires_in: number;
}
