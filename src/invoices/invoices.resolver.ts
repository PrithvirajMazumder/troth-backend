import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InvoicesService } from '@/invoices/invoices.service'
import { Invoice, InvoiceItem } from '@/invoices/entities/invoice.entity'
import { CreateInvoiceInput } from '@/invoices/dto/create-invoice.input'
import { UpdateInvoiceInput } from '@/invoices/dto/update-invoice.input'
import { Company } from '@/companies/entities/company.entity'
import { CompaniesService } from '@/companies/companies.service'
import { Tax } from '@/taxes/entities/tax.entity'
import { BanksService } from '@/banks/banks.service'
import { TaxesService } from '@/taxes/taxes.service'
import { Bank } from '@/banks/entities/bank.entity'
import { ItemsService } from '@/items/items.service'

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly companiesService: CompaniesService,
    private readonly banksService: BanksService,
    private readonly taxesService: TaxesService,
    private readonly itemsService: ItemsService
  ) {}

  @Mutation(() => Invoice)
  createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput) {
    return this.invoicesService.create(createInvoiceInput)
  }

  @Query(() => [Invoice], { name: 'invoices' })
  findAllByCompanyId(@Args('companyId') companyId: string) {
    return this.invoicesService.findAllByCompanyId(companyId)
  }

  @Query(() => Invoice, { name: 'invoice' })
  findOne(@Args('id') id: string) {
    return this.invoicesService.findOne(id)
  }

  @Mutation(() => Invoice)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoicesService.update(updateInvoiceInput.id, updateInvoiceInput)
  }

  @Mutation(() => Invoice)
  removeInvoice(@Args('id') id: string) {
    return this.invoicesService.remove(id)
  }

  @ResolveField('company', () => Company)
  getCompany(@Parent() invoice: Invoice) {
    const { companyId } = invoice
    return this.companiesService.findOne(companyId)
  }

  @ResolveField('tax', () => Tax)
  getTax(@Parent() invoice: Invoice) {
    const { taxId } = invoice
    return this.taxesService.findOne(taxId)
  }

  @ResolveField('bank', () => Bank)
  getBank(@Parent() invoice: Invoice) {
    const { bankId } = invoice
    return this.banksService.findOne(bankId)
  }

  @ResolveField('invoiceItems', () => [InvoiceItem])
  async getInvoiceItems(@Parent() invoice: Invoice) {
    const { invoiceItems } = invoice
    const itemIds = invoiceItems.map((invoiceItem) => invoiceItem.itemId)
    const items = await this.itemsService.findItemsByIds(itemIds)
    return invoiceItems.map(({ price, quantity, itemId }, index) => ({
      price,
      quantity,
      item: items[index] as unknown,
      itemId
    }))
  }
}
