import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsIn } from 'class-validator';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  new_password: string;

  @Prop({ enum: ['nam', 'nữ'] })
  @IsIn(['nam', 'nữ'], { message: 'Gender must be either "nam" or "nữ".' })
  gender: string;

  @Prop()
  date_of_birth: Date;

  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop()
  avatar: string;

  @Prop()
  age: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
