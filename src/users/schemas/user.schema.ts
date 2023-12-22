import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WorkoutDocument } from 'src/workouts/schemas/workout.schema';

export class WorkoutProgressForUser extends Document {
  @Prop()
  progress: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  })
  workout: WorkoutDocument;
}

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  avatar: string;

  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop()
  date_of_birth: Date;

  @Prop()
  nam: string;

  @Prop({
    type: [WorkoutProgressForUser],
  })
  workouts: WorkoutProgressForUser[];
}

export const UserSchema = SchemaFactory.createForClass(User);
