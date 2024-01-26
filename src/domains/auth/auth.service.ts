import { Injectable } from '@nestjs/common'
import { UsersService } from '@/domains/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/domains/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  validate(email: string, password: string): User | null {
    const user = this.usersService.getUserByEmail(email)

    if (!user) {
      return null
    }

    const passwordIsValid = password === user.password
    return passwordIsValid ? user : null
  }
}
