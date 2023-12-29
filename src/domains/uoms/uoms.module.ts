import { Module } from '@nestjs/common'
import { UomsService } from '@/domains/uoms/uoms.service'
import { UomsResolver } from '@/domains/uoms/uoms.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Uom, UomSchema } from '@/domains/uoms/schemas/uom.schema'
import { UomsRepository } from '@/domains/uoms/uoms.repository'
import { CompaniesModule } from '@/domains/companies/companies.module'

const model = MongooseModule.forFeature([{ name: Uom.name, schema: UomSchema }])

@Module({
  imports: [CompaniesModule, model],
  providers: [UomsResolver, UomsService, UomsRepository],
  exports: [model, UomsService, UomsRepository]
})
export class UomsModule {}
