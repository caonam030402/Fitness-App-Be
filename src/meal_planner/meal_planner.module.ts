import { Module } from '@nestjs/common';
import { MealPlannerService } from './meal_planner.service';
import { MealPlannerController } from './meal_planner.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { MealPlanner, MealPlannersSchema } from './schemas/meal_planner.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeOfDay, TimeOfDaySchema } from './schemas/time_of_day.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [MealPlannerService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: MealPlanner.name, schema: MealPlannersSchema },
      { name: TimeOfDay.name, schema: TimeOfDaySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [MealPlannerController],
})
export class MealPlannerModule {}
