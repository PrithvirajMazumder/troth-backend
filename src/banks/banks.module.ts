import { Module } from '@nestjs/common'
import { BanksService } from '@/banks/banks.service'
import { BanksResolver } from '@/banks/banks.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Bank, BankSchema } from '@/banks/schemas/bank.schema'
import { BanksRepository } from '@/banks/banks.repository'
import { UsersService } from '@/users/users.service'
import { UsersRepository } from '@/users/users.repository'
import { User, UserSchema } from '@/users/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bank.name, schema: BankSchema },
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [BanksResolver, BanksService, BanksRepository, UsersService, UsersRepository]
})
export class BanksModule {}
