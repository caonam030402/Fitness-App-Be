import {
  IsEmail,
  IsString,
  IsDateString,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { WorkoutDto } from 'src/workouts/dto/workoutDto';

export class UserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please enter a correct email address' })
  readonly email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Please enter a valid weight' })
  readonly weight?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Please enter a valid height' })
  readonly height?: number;

  @IsOptional()
  @IsString({ message: 'Please enter a valid avatar URL' })
  readonly avatar?: string;

  @IsOptional()
  @IsString({ message: 'Please enter a valid gender' })
  readonly gender?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Please enter a valid date of birth' })
  readonly date_of_birth?: string;

  @IsOptional()
  @IsArray()
  readonly workouts?: WorkoutDto;
}
