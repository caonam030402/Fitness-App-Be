import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WorkoutDetail } from './workoutDetail.schema';

export type WorkoutDocument = Workout & Document;

@Schema({
  timestamps: true,
})
export class Workout {
  @Prop()
  name: string;

  @Prop()
  imageUrl: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutDetail' }],
  })
  details: WorkoutDetail[];
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
