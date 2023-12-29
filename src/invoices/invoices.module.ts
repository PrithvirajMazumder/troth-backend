import { Module } from '@nestjs/common'
import { InvoicesService } from '@/invoices/invoices.service'
import { InvoicesResolver } from '@/invoices/invoices.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { Invoice, InvoiceSchema } from '@/invoices/schemas/invoice.schema'
import { Bank, BankSchema } from '@/banks/schemas/bank.schema'
import { Tax, TaxSchema } from '@/taxes/schemas/tax.schema'
import { Company, CompanySchema } from '@/companies/schemas/company.schema'
import { InvoicesRepository } from '@/invoices/invoices.repository'
import { BanksService } from '@/banks/banks.service'
import { BanksRepository } from '@/banks/banks.repository'
import { TaxesService } from '@/taxes/taxes.service'
import { TaxesRepository } from '@/taxes/taxes.repository'
import { CompaniesService } from '@/companies/companies.service'
import { CompaniesRepository } from '@/companies/companies.repository'
import { ItemsService } from '@/items/items.service'
import { ItemsRepository } from '@/items/items.repository'
import { Item, ItemSchema } from '@/items/schemas/item.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
      { name: Bank.name, schema: BankSchema },
      { name: Tax.name, schema: TaxSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Item.name, schema: ItemSchema }
    ])
  ],
  providers: [
    InvoicesResolver,
    InvoicesService,
    InvoicesRepository,
    BanksService,
    BanksRepository,
    TaxesService,
    TaxesRepository,
    CompaniesService,
    CompaniesRepository,
    ItemsService,
    ItemsRepository
  ]
})
export class InvoicesModule {}
