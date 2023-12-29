import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemsService } from '@/domains/items/items.service'
import { ItemsResolver } from '@/domains/items/items.resolver'
import { ItemsRepository } from '@/domains/items/items.repository'
import { Item, ItemSchema } from '@/domains/items/schemas/item.schema'
import { UomsModule } from '@/domains/uoms/uoms.module'
import { CompaniesModule } from '@/domains/companies/companies.module'
import { TaxesModule } from '@/domains/taxes/taxes.module'

const model = MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])

@Module({
  imports: [UomsModule, CompaniesModule, TaxesModule, model],
  providers: [ItemsResolver, ItemsService, ItemsRepository],
  exports: [model, ItemsService, ItemsRepository]
})
export class ItemsModule {}
