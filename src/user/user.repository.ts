import { EntityRepository } from '@/db/entity.repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, User } from '@/user/schemas/user.schema'

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  public constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel)
  }
}
