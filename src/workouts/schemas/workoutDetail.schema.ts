import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class WorkoutDetail {
  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  timeSeconds: number;

  @Prop()
  desciption: string;

  @Prop()
  video: string;

  @Prop()
  colories: number;
}

export const WorkoutDetailSchema = SchemaFactory.createForClass(WorkoutDetail);
