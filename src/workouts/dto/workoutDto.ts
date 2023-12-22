import { IsString, IsOptional, IsArray } from 'class-validator';
import { WorkoutDetailDto } from './workoutDetailDto';

export class WorkoutDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly imageUrl: string;

  @IsOptional()
  @IsArray()
  details: WorkoutDetailDto;
}
