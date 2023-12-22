import { Controller, Get, Put } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Get('/')
  async getAllWorkout() {
    const workouts = await this.workoutService.getAllWorkouts();
    return workouts;
  }

  @Put('/')
  async updateWorkoutProgress() {
    const workouts = await this.workoutService.getAllWorkouts();
    return workouts;
  }
}
