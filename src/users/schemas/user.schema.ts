import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
