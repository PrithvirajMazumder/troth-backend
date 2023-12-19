import { Expose } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  public constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial)
  }

  @Expose({ name: 'id' })
  @IsOptional()
  public _id?: string

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
