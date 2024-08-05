import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'john@doe.com',
    description: 'Provide the valid email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'secret password',
    description: 'Provide the valid password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
