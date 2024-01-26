import { PickType } from '@nestjs/swagger'
import { SignupInput } from '@/domains/auth/dto/signup.input'

export class LoginInput extends PickType(SignupInput, ['email', 'password']) {}
