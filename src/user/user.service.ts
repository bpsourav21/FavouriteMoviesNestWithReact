import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async create(signUpDto: SignUpDto): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        ...signUpDto
      }
    })
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        ...updateUserDto
      }
    });
  }

  async remove(id: number) {
    const user =
      await this.prismaService.user.delete({ where: { id } })

    if (!user)
      throw new ForbiddenException(
        'User not found',
      );

    return "User deleted successfully"
  }
}
