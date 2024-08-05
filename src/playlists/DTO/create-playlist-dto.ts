import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlayListDto {
  @ApiProperty({
    example: 'John',
    description: 'Provide the first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly name;

  @ApiProperty({
    example: 'Animal',
    description: 'Provide the name of the song',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;

  @ApiProperty({
    example: '1',
    description: 'Provide the user id',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
