import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from '@/user/user.controller'
import { UserService } from '@/user/user.service'
import { User, UserSchema } from '@/user/schemas/user.schema'
import { UserRepository } from '@/user/user.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
