import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesResolver } from './companies.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from '@/domains/companies/schemas/company.schema'
import { CompaniesRepository } from '@/domains/companies/companies.repository'
import { UsersModule } from '@/domains/users/users.module'
import { BanksModule } from '@/domains/banks/banks.module'

const model = MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])

@Module({
  imports: [UsersModule, BanksModule, model],
  providers: [CompaniesResolver, CompaniesService, CompaniesRepository],
  exports: [model, CompaniesService, CompaniesRepository]
})
export class CompaniesModule {}
