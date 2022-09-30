import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken";
import { LoggedInDto } from './dto/loggedIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService
  ) { }

  async signUp(signUp: SignUpDto): Promise<String> {
    const hash = bcrypt.hashSync(signUp.password, bcrypt.genSaltSync(10));
    // Replace password with hash
    signUp.password = hash;

    // Create new user
    const user =
      await this.userService.create(signUp);

    // if user does not created throw exception
    if (!user)
      throw new ForbiddenException(
        'User not created',
      );

    return "User created successfully";
  }

  async signIn(signIn: SignInDto): Promise<LoggedInDto> {
    // find the user by email
    const user =
      await this.userService.findOneByEmail(signIn.email);

    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'User not found',
      );

    // compare password
    const pwMatches =
      bcrypt.compareSync(signIn.password, user.password);

    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    const header = {
      alg: "HS256",
      typ: "JWT",
    }
    const payload = {
      sub: user.email,
      id: user.id,
      iat: Date.now(),
    };

    const signedToken =
      jwt.sign(
        payload, process.env.JWT_SECRET_KEY,
        {
          header,
          expiresIn: 30 * 60 * 1000 /*in minutes*/
        }
      );

    const expiresIn = this.parseJwt(signedToken)

    return {
      access_token: signedToken,
      expires_in: expiresIn ? expiresIn.exp : 0
    };
  }

  parseJwt(token) {
    try {
      return JSON.parse(
        Buffer.from(
          token.split('.')[1], 'base64'
        ).toString()
      );

    } catch (error) {
      return null;
    }

  }
}
