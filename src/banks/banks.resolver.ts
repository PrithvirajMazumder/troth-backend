import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BanksService } from './banks.service'
import { Bank } from './entities/bank.entity'
import { CreateBankInput } from './dto/create-bank.input'
import { UpdateBankInput } from './dto/update-bank.input'

@Resolver(() => Bank)
export class BanksResolver {
  constructor(private readonly banksService: BanksService) {}

  @Mutation(() => Bank)
  createBank(@Args('createBankInput') createBankInput: CreateBankInput) {
    return this.banksService.create(createBankInput)
  }

  @Query(() => [Bank], { name: 'banks' })
  findAll() {
    return this.banksService.findAll()
  }

  @Query(() => Bank, { name: 'bank' })
  findOne(@Args('id') id: string) {
    return this.banksService.findOne(id)
  }

  @Mutation(() => Bank)
  updateBank(@Args('updateBankInput') updateBankInput: UpdateBankInput) {
    return this.banksService.update(updateBankInput.id, updateBankInput)
  }

  @Mutation(() => Bank)
  removeBank(@Args('id', { type: () => Int }) id: number) {
    return this.banksService.remove(id)
  }
}
