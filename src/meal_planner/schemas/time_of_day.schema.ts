import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeOfDayDocument = TimeOfDay & Document;
@Schema({
  timestamps: true,
})
export class TimeOfDay extends Document {
  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  timeStart: Date;

  @Prop()
  timeEnd: Date;
}

export const TimeOfDaySchema = SchemaFactory.createForClass(TimeOfDay);
