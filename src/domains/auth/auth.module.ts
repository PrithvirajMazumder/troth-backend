import { Module } from '@nestjs/common'
import { AuthService } from '@/domains/auth/auth.service'
import { UsersModule } from '@/domains/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { environment } from '@/configs/environment'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: {
        //TODO: move this in environment file
        expiresIn: '3600s'
      }
    })
  ],
  providers: [AuthService]
})
export class AuthModule {}
