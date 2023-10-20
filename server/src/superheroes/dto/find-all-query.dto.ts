import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllQueryDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit = 5;
}
