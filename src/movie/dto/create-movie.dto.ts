import { IsNotEmpty } from 'class-validator';
export class CreateMovieDto {
    @IsNotEmpty()
    movieName: string
}
