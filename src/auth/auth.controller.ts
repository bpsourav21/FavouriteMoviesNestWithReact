import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post("signin")
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
