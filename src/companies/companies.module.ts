import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesResolver } from './companies.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from '@/companies/schemas/company.schema'
import { CompaniesRepository } from '@/companies/companies.repository'
import { User, UserSchema } from '@/users/schemas/user.schema'
import { Bank, BankSchema } from '@/banks/schemas/bank.schema'
import { BanksService } from '@/banks/banks.service'
import { BanksRepository } from '@/banks/banks.repository'
import { UsersService } from '@/users/users.service'
import { UsersRepository } from '@/users/users.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: Bank.name, schema: BankSchema },
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [
    CompaniesResolver,
    CompaniesService,
    CompaniesRepository,
    BanksService,
    BanksRepository,
    UsersService,
    UsersRepository
  ]
})
export class CompaniesModule {}
