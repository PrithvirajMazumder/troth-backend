import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

export class User {
  @Prop({ required: true, unique: true })
  legalName: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, unique: true })
  phone: number
}

export const UserSchema = SchemaFactory.createForClass(User)
