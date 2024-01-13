import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from 'src/auth/dto/signUpDto';
import { UserDto } from './dto/userDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<UserDocument> {
    const createdUser = this.userModel.create(signUpDto);
    return createdUser;
  }

  async update(body: UserDto, userId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { ...body }, { new: true, strict: false })
      .populate({
        path: 'workouts.workout',
        model: 'Workout',
        strictPopulate: false,
        populate: {
          path: 'details',
          model: 'WorkoutDetail',
        },
      });

    return user;
  }

  async findByNameAndEmail(email: string, name: string): Promise<User> {
    return this.userModel.findOne({ email, name }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel
      .findById(id, { password: 0 })
      .populate({
        path: 'workouts.workout',
        model: 'Workout',
        strictPopulate: false,
        populate: {
          path: 'details',
          model: 'WorkoutDetail',
        },
      })
      .populate({
        path: 'mealPlanners.mealPlanner',
        model: 'MealPlanner',
      })
      .exec();
  }
}
