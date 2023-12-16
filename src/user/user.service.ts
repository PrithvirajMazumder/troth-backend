import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { User } from './schemas/user.schema'
import { Types } from 'mongoose'

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async getAll(): Promise<Array<User>> {
    return await this.userRepository.find({})
  }

  public async getById(userId: string): Promise<User> {
    const userObjectId = new Types.ObjectId(userId)

    return await this.userRepository.findOne({ _id: userObjectId })
  }
}
