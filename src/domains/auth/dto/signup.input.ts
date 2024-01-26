import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignupInput {
  @IsEmail()
  @ApiProperty({
    example: 'yourname@domain.com',
    description: "User's Email",
    type: () => 'string'
  })
  readonly email: { type: string; lowercase: true }

  @IsString()
  @MinLength(5)
  @ApiProperty({
    description: "User's Password (only applies when using username/password)",
    type: () => 'strung'
  })
  readonly password: string

  @IsString()
  @ApiProperty({ description: "User's Display Name to use in the UI", type: () => 'string' })
  readonly name: string

  @IsPhoneNumber('IN')
  phone: number
}
