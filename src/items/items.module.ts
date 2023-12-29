import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsService } from '@/items/items.service'
import { ItemsResolver } from '@/items/items.resolver'
import { ItemsRepository } from '@/items/items.repository'
import { Item, ItemSchema } from '@/items/schemas/item.schema'
import { Uom, UomSchema } from '@/uoms/schemas/uom.schema'
import { Company, CompanySchema } from '@/companies/schemas/company.schema'
import { Tax, TaxSchema } from '@/taxes/schemas/tax.schema'
import { UomsService } from '@/uoms/uoms.service'
import { UomsRepository } from '@/uoms/uoms.repository'
import { CompaniesService } from '@/companies/companies.service'
import { CompaniesRepository } from '@/companies/companies.repository'
import { TaxesService } from '@/taxes/taxes.service'
import { TaxesRepository } from '@/taxes/taxes.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: Uom.name, schema: UomSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Tax.name, schema: TaxSchema }
    ])
  ],
  providers: [
    ItemsResolver,
    ItemsService,
    ItemsRepository,
    UomsService,
    UomsRepository,
    CompaniesService,
    CompaniesRepository,
    TaxesService,
    TaxesRepository
  ]
})
export class ItemsModule {}
