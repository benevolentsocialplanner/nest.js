import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Platform {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
}

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: string;

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ required: true })
  userUniqeId: string;

  @Prop({})
  country: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop()
  notificationId: string;

  @Prop({ default: 1 })
  version: number;

  @Prop({ type: String, enum: Platform, default: Platform.WEB })
  platform: Platform;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
