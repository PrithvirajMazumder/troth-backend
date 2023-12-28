import { Injectable } from '@nestjs/common'
import { CreateBankInput } from '@/banks/dto/create-bank.input'
import { UpdateBankInput } from '@/banks/dto/update-bank.input'
import { BanksRepository } from '@/banks/banks.repository'
import { Types } from 'mongoose'

@Injectable()
export class BanksService {
  public constructor(private readonly banksRepository: BanksRepository) {}

  public async create(createBankInput: CreateBankInput) {
    const { accountNumber } = createBankInput
    const userId = new Types.ObjectId(createBankInput.userId)
    const duplicateBanks = await this.banksRepository.find({ _id: userId, accountNumber })

    if (!duplicateBanks.length) {
      return await this.banksRepository.save(createBankInput)
    }

    throw new Error('Duplicate bank accounts found!')
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
