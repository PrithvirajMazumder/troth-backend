import { Module } from '@nestjs/common'
import { BanksService } from '@/banks/banks.service'
import { BanksResolver } from '@/banks/banks.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Bank, BankSchema } from '@/banks/schemas/bank.schema'
import { BanksRepository } from '@/banks/banks.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }])],
  providers: [BanksResolver, BanksService, BanksRepository]
})
export class BanksModule {}
