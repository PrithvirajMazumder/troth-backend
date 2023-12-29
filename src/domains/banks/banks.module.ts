import { Module } from '@nestjs/common'
import { BanksService } from '@/domains/banks/banks.service'
import { BanksResolver } from '@/domains/banks/banks.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Bank, BankSchema } from '@/domains/banks/schemas/bank.schema'
import { BanksRepository } from '@/domains/banks/banks.repository'
import { UsersModule } from '@/domains/users/users.module'

const model = MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }])

@Module({
  imports: [UsersModule, model],
  providers: [BanksResolver, BanksService, BanksRepository],
  exports: [model, BanksService, BanksRepository]
})
export class BanksModule {}
