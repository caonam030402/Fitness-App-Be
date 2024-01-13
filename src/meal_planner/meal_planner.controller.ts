import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MealPlannerService } from './meal_planner.service';
import { QueryFieldMealPlanner } from 'src/enums';
import { UsersService } from 'src/users/users.service';
import { successResponse } from 'src/utils';

@Controller('meal-planner')
export class MealPlannerController {
  constructor(
    private mealPlannerService: MealPlannerService,
    private usersService: UsersService,
  ) {}

  @Get('/time-of-day')
  async getTimeOfDays() {
    const timeOfDays = await this.mealPlannerService.getTimeOfDays();
    return timeOfDays;
  }

  @Get('/categories')
  async getCategories() {
    const categories = await this.mealPlannerService.getCategories();
    return categories;
  }

  @Post('/:userId')
  async addMealPlannersForUser(@Param('userId') _id, @Body() body) {
    const meals = await this.usersService.update(body, _id);
    return successResponse('Thêm thành công', meals.mealPlanners);
  }

  @Get('/:userId?')
  async getMealPlanners(
    @Query('field') queryField: QueryFieldMealPlanner,
    @Param('userId') userId: string,
  ) {
    const meals = this.mealPlannerService.getAll(queryField, userId);
    return meals;
  }
}
