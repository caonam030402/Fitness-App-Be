import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from './schemas/workout.schema';
import { Model } from 'mongoose';
import { successResponse } from 'src/utils';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModel: Model<Workout>,
  ) {}

  async getAllWorkouts() {
    const workout = await this.workoutModel.find().populate('details');
    return successResponse('Lấy bài tập thành công', workout);
  }

  async updateWorkoutForUser() {}
}
