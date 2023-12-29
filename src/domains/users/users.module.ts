import { Module } from '@nestjs/common'
import { UsersService } from '@/domains/users/users.service'
import { UsersResolver } from '@/domains/users/users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@/domains/users/schemas/user.schema'
import { UsersRepository } from '@/domains/users/users.repository'

const dbModule = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])

@Module({
  imports: [dbModule],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [dbModule, UsersService, UsersRepository]
})
export class UsersModule {}
