import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { Types } from 'mongoose'
import { plainToInstance } from 'class-transformer'
import { UserDto } from '@/user/dtos/user.dto'

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async getAll(): Promise<Array<UserDto>> {
    return await this.userRepository.find({})
  }

  public async getById(userId: string): Promise<UserDto> {
    const userObjectId = new Types.ObjectId(userId)
    return new UserDto((await this.userRepository.findOne({ _id: userObjectId })).toJSON())
  }

  public async create(user: UserDto): Promise<UserDto> {
    const newUser = await this.userRepository.save(
      plainToInstance(UserDto, user, { excludeExtraneousValues: true })
    )
    return new UserDto(newUser.toJSON())
  }
}
