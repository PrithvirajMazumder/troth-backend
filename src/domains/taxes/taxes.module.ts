import { Module } from '@nestjs/common'
import { TaxesService } from './taxes.service'
import { TaxesResolver } from './taxes.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Tax, TaxSchema } from '@/domains/taxes/schemas/tax.schema'
import { TaxesRepository } from '@/domains/taxes/taxes.repository'

const model = MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema }])

@Module({
  imports: [model],
  providers: [TaxesResolver, TaxesService, TaxesRepository],
  exports: [model, TaxesService, TaxesRepository]
})
export class TaxesModule {}
