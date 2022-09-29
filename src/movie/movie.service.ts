import { ForbiddenException, Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  async create(createMoviedDto: CreateMovieDto, userId: number): Promise<Movie> {
    return await this.prismaService.movie.create({
      data: {
        userId,
        ...createMoviedDto
      }
    })
  }

  async findAllByUserId(userId: number): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({ where: { userId } })
  }

  async findOne(id: number) {
    return await this.prismaService.movie.findUnique({ where: { id } })
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return await this.prismaService.movie.update({
      where: { id },
      data: {
        ...updateMovieDto,
      },
    })
  }

  async remove(id: number) {
    const movie =
      await this.prismaService.movie.delete({ where: { id } })

    if (!movie)
      throw new ForbiddenException(
        'No movie found',
      );

    return "Successfully movie deleted"
  }
}
