import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Account {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;
}

export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);
