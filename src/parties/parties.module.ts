import { Module } from '@nestjs/common'
import { PartiesService } from '@/parties/parties.service'
import { PartiesResolver } from '@/parties/parties.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Party, PartySchema } from '@/parties/schemas/party.schema'
import { Company, CompanySchema } from '@/companies/schemas/company.schema'
import { PartiesRepository } from '@/parties/parties.repository'
import { CompaniesService } from '@/companies/companies.service'
import { CompaniesRepository } from '@/companies/companies.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Party.name, schema: PartySchema },
      { name: Company.name, schema: CompanySchema }
    ])
  ],
  providers: [
    PartiesResolver,
    PartiesService,
    PartiesRepository,
    CompaniesService,
    CompaniesRepository
  ]
})
export class PartiesModule {}
