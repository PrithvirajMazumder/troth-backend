import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { BanksService } from '@/banks/banks.service'
import { Bank } from '@/banks/entities/bank.entity'
import { CreateBankInput } from '@/banks/dto/create-bank.input'
import { UpdateBankInput } from '@/banks/dto/update-bank.input'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'

@Resolver(() => Bank)
export class BanksResolver {
  constructor(
    private readonly banksService: BanksService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => Bank)
  createBank(@Args('createBankInput') createBankInput: CreateBankInput) {
    return this.banksService.create(createBankInput)
  }

  @Query(() => [Bank], { name: 'banks' })
  async findAll() {
    return await this.banksService.findAll()
  }

  @Query(() => Bank, { name: 'bank' })
  async findOne(@Args('id') id: string) {
    return await this.banksService.findOne(id)
  }

  @Mutation(() => Bank)
  updateBank(@Args('updateBankInput') updateBankInput: UpdateBankInput) {
    return this.banksService.update(updateBankInput.id, updateBankInput)
  }

  @Mutation(() => Bank)
  removeBank(@Args('id', { type: () => Int }) id: number) {
    return this.banksService.remove(id)
  }

  @ResolveField('user', () => User)
  getUser(@Parent() bank: Bank) {
    const { userId } = bank
    return this.usersService.findOne(userId)
  }
}
