import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    example: 'Animal',
    description: 'Provide a song title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: '1',
    description: 'Provide a number ',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  // @IsString({ each: true })
  readonly artists;

  @ApiProperty({
    example: '01/01/2024',
    description: 'Provide a date ',
  })
  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @ApiProperty({
    example: '05:00',
    description: 'Provide a time duration',
  })
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @ApiProperty({
    example: 'Lyrics',
    description: 'Provide song lyrics',
  })
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
