import { Module } from '@nestjs/common'
import { TaxesService } from './taxes.service'
import { TaxesResolver } from './taxes.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Tax, TaxSchema } from '@/taxes/schemas/tax.schema'
import { TaxesRepository } from '@/taxes/taxes.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema }])],
  providers: [TaxesResolver, TaxesService, TaxesRepository]
})
export class TaxesModule {}
