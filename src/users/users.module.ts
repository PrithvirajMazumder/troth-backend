import { Module } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { UsersResolver } from '@/users/users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@/users/schemas/user.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersResolver, UsersService, UsersResolver]
})
export class UsersModule {}
