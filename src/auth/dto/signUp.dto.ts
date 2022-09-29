import { SignInDto } from "./signIn.dto";
import { IsNotEmpty } from 'class-validator';
export class SignUpDto extends SignInDto {
    @IsNotEmpty()
    name: string;
}
