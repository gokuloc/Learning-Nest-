import { IsOptional } from 'class-validator';

export class PaginateFilterDto {
  //   @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  lyrics?: string;

  //   @IsNumber({}, { each: true })
  @IsOptional()
  artistId?: number;

  //   @IsDateString()
  @IsOptional()
  startDate?: string;

  //   @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsOptional()
  order?: number;
}
