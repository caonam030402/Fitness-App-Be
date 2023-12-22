import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class WorkoutDetail {
  @Prop()
  imageUrl: string;

  @Prop()
  name: string;

  @Prop()
  timeSeconds: number;

  @Prop()
  description: string;

  @Prop()
  video: string;

  @Prop()
  colories: number;
}

export const WorkoutDetailSchema = SchemaFactory.createForClass(WorkoutDetail);
