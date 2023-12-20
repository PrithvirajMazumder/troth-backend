import { Expose, Transform } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class UserDto {
  public constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }

  @Expose({ name: 'id' })
  @Transform(({value}) => typeof value === 'string' ? value : value?.toHexString())
  @IsOptional()
  public _id?: string | Types.ObjectId

  @Expose()
  @IsString()
  public name: string

  @Expose()
  @IsString()
  @IsEmail()
  public email: string

  @Expose()
  @IsNumber()
  public phone: number
}
