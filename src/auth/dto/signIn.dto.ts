import { IsEmail, IsNotEmpty, MinLength, MaxLength,  } from 'class-validator';

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}
