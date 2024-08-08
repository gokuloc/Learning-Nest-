import { IsOptional } from 'class-validator';

export class UserPaginateDTO {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  email?: string;
}
