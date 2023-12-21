import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import {
  WorkoutDetail,
  WorkoutDetailSchema,
} from './schemas/workoutDetail.schema';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [
    MongooseModule.forFeature([
      { name: Workout.name, schema: WorkoutSchema },
      { name: WorkoutDetail.name, schema: WorkoutDetailSchema },
    ]),
  ],
})
export class WorkoutsModule {}
