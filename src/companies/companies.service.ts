import { Injectable } from '@nestjs/common'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { UsersRepository } from '@/users/users.repository'
import { Types } from 'mongoose'

@Injectable()
export class CompaniesService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public create(createCompanyInput: CreateCompanyInput) {
    return this.usersRepository.save(createCompanyInput)
  }

  public findAll() {
    return this.usersRepository.find({})
  }

  public findOne(id: string) {
    const userId = new Types.ObjectId(id)
    return this.usersRepository.findOne({ _id: userId })
  }

  public update(id: string, updateCompanyInput: UpdateCompanyInput) {
    const userId = new Types.ObjectId(id)
    return this.usersRepository.findOneAndUpdate({ _id: userId }, updateCompanyInput)
  }

  public remove(id: string) {
    const userId = new Types.ObjectId(id)
    return this.usersRepository.findOneAndDelete({ _id: userId })
  }
}
