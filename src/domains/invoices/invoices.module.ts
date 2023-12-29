import { Module } from '@nestjs/common'
import { InvoicesService } from '@/domains/invoices/invoices.service'
import { InvoicesResolver } from '@/domains/invoices/invoices.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Invoice, InvoiceSchema } from '@/domains/invoices/schemas/invoice.schema'
import { InvoicesRepository } from '@/domains/invoices/invoices.repository'
import { BanksModule } from '@/domains/banks/banks.module'
import { TaxesModule } from '@/domains/taxes/taxes.module'
import { CompaniesModule } from '@/domains/companies/companies.module'
import { ItemsModule } from '@/domains/items/items.module'

const model = MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }])

@Module({
  imports: [model, BanksModule, TaxesModule, CompaniesModule, ItemsModule],
  providers: [InvoicesResolver, InvoicesService, InvoicesRepository],
  exports: [model, InvoicesService, InvoicesRepository]
})
export class InvoicesModule {}
