import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private _prismaService: PrismaService,
  ) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this._prismaService.user.create({data})
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this._prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
