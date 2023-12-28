import { Module } from '@nestjs/common'
import { UomsService } from '@/uoms/uoms.service'
import { UomsResolver } from '@/uoms/uoms.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Uom, UomSchema } from '@/uoms/schemas/uom.schema'
import { Company } from '@/companies/schemas/company.schema'
import { UomsRepository } from '@/uoms/uoms.repository'
import { CompaniesService } from '@/companies/companies.service'
import { CompaniesRepository } from '@/companies/companies.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Uom.name, schema: UomSchema },
      {
        name: Company.name,
        schema: UomSchema
      }
    ])
  ],
  providers: [UomsResolver, UomsService, UomsRepository, CompaniesService, CompaniesRepository]
})
export class UomsModule {}
