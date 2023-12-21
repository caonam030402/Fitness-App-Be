import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Workout } from 'src/workouts/schemas/workout.schema';

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
  @Type(() => Workout)
  workout: Workout[];
}

export const UserSchema = SchemaFactory.createForClass(User);
