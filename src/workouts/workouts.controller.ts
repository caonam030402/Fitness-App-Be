import { Controller, Get } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Get('/')
  async getUser() {
    const workouts = await this.workoutService.getAllWorkouts();
    return workouts;
  }
}
