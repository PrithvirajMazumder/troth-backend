import { Injectable } from '@nestjs/common'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { Types } from 'mongoose'
import { CompaniesRepository } from '@/companies/companies.repository'

@Injectable()
export class CompaniesService {
  public constructor(private readonly companiesRepository: CompaniesRepository) {}

  public create(createCompanyInput: CreateCompanyInput) {
    return this.companiesRepository.save(createCompanyInput)
  }

  public findAll() {
    return this.companiesRepository.find({})
  }

  public findOne(id: string) {
    const userId = new Types.ObjectId(id)
    return this.companiesRepository.findOne({ _id: userId })
  }

  public update(id: string, updateCompanyInput: UpdateCompanyInput) {
    const userId = new Types.ObjectId(id)
    return this.companiesRepository.findOneAndUpdate({ _id: userId }, updateCompanyInput)
  }

  public remove(id: string) {
    const userId = new Types.ObjectId(id)
    return this.companiesRepository.findOneAndDelete({ _id: userId })
  }
}
