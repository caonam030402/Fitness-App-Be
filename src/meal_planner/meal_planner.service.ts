import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MealPlanner,
  MealPlannerDocument,
} from './schemas/meal_planner.schema';
import { User } from 'src/users/schemas/user.schema';
import { calculateBMI, successResponse } from 'src/utils';
import { Classify, QueryFieldMealPlanner } from 'src/enums';
import { TimeOfDay } from './schemas/time_of_day.schema';
import { Category } from './schemas/category.schema';

@Injectable()
export class MealPlannerService {
  constructor(
    @InjectModel(MealPlanner.name)
    private mealPlannerModel: Model<MealPlanner>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(TimeOfDay.name)
    private timeOfDayModel: Model<TimeOfDay>,
    @InjectModel(Category.name)
    private categoryModel: Model<TimeOfDay>,
  ) {}

  async getTimeOfDays() {
    const timeOfDays = await this.timeOfDayModel.find();
    return successResponse(
      'Lấy kế hoạch khoảng thời gian trong ngày thành công',
      timeOfDays,
    );
  }

  async getCategories() {
    const categories = await this.categoryModel.find();
    return successResponse('Lấy category thành công', categories);
  }

  async getAll(queryField: QueryFieldMealPlanner, user_id: string) {
    let mealPlanner: MealPlannerDocument[];

    if (queryField === QueryFieldMealPlanner.POPULAR) {
      mealPlanner = await this.mealPlannerModel.find({ popular: true });
    } else if (queryField === QueryFieldMealPlanner.RECOMMEND && user_id) {
      const user = await this.userModel.findOne({ _id: user_id });
      const bmi = calculateBMI(user.weight, user.height);
      const bodyLevel =
        bmi < 18.5
          ? Classify.THIN
          : bmi > 24.9
            ? Classify.FAT
            : Classify.NORMAL;
      mealPlanner = await this.mealPlannerModel.find({
        forTheBody: bodyLevel,
      });
    } else {
      mealPlanner = await this.mealPlannerModel.find();
    }

    return successResponse('Lấy kế hoạch ăn uống thành công', mealPlanner);
  }
}
