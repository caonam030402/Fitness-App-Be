import { IsString, IsOptional, IsNumber } from 'class-validator';

export class WorkoutDetailDto {
  @IsOptional()
  @IsString()
  readonly imageUrl: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsString()
  readonly timeSeconds: number;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly video: string;

  @IsOptional()
  @IsNumber()
  readonly calories: number;
}
