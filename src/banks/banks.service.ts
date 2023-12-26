import { Injectable } from '@nestjs/common'
import { CreateBankInput } from './dto/create-bank.input'
import { UpdateBankInput } from './dto/update-bank.input'
import { BanksRepository } from '@/banks/banks.repository'
import { Types } from 'mongoose'

@Injectable()
export class BanksService {
  public constructor(private readonly banksRepository: BanksRepository) {}

  public async create(createBankInput: CreateBankInput) {
    return await this.banksRepository.save(createBankInput)
  }

  public async findAll() {
    return await this.banksRepository.find({})
  }

  public async findOne(id: string) {
    const bankId = new Types.ObjectId(id)
    return await this.banksRepository.findOne({ _id: bankId })
  }

  public async update(id: string, updateBankInput: UpdateBankInput) {
    const bankId = new Types.ObjectId(id)
    return await this.banksRepository.findOneAndUpdate({ _id: bankId }, updateBankInput)
  }

  public async remove(id: number) {
    const bankId = new Types.ObjectId(id)
    return await this.banksRepository.findOneAndDelete({ _id: bankId })
  }
}
