import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { CategoryDocument } from './category.schema';
import { TimeOfDayDocument } from './time_of_day.schema';
import { Classify } from 'src/enums';
import { UserDocument } from 'src/users/schemas/user.schema';

export type MealPlannerDocument = MealPlanner & Document;
@Schema({
  timestamps: true,
})
export class MealPlanner extends Document {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  calories: number;

  @Prop()
  descriptions: string;

  @Prop()
  popular: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeOfDay',
  })
  timeOfDay: TimeOfDayDocument;

  @Prop({ type: String, enum: Classify, default: Classify.NORMAL })
  forTheBody: Classify;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: CategoryDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user_id: UserDocument;
}

export const MealPlannersSchema = SchemaFactory.createForClass(MealPlanner);
