import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InvoicesService } from '@/domains/invoices/invoices.service'
import { Invoice, InvoiceItem } from '@/domains/invoices/entities/invoice.entity'
import { CreateInvoiceInput } from '@/domains/invoices/dto/create-invoice.input'
import { UpdateInvoiceInput } from '@/domains/invoices/dto/update-invoice.input'
import { Company } from '@/domains/companies/entities/company.entity'
import { CompaniesService } from '@/domains/companies/companies.service'
import { Tax } from '@/domains/taxes/entities/tax.entity'
import { BanksService } from '@/domains/banks/banks.service'
import { TaxesService } from '@/domains/taxes/taxes.service'
import { Bank } from '@/domains/banks/entities/bank.entity'
import { ItemsService } from '@/domains/items/items.service'
import { PartiesService } from '@/domains/parties/parties.service'
import { Party } from '@/domains/parties/entities/party.entity'
import {
  AllowedInvoiceStatus,
  InvoiceStatus
} from '@/domains/invoices/constants/allowedInvoiceStatus'
import { Logger } from '@nestjs/common'
import { InvoiceCountByDateRange } from '@/domains/invoices/schemas/invoiceCountByDateRange.schema'
import { InvoicesCountByDateRangeInput } from '@/domains/invoices/types/invoicesCountByDateRange.type'

@Resolver(() => Invoice)
export class InvoicesResolver {
  private logger: Logger

  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly companiesService: CompaniesService,
    private readonly banksService: BanksService,
    private readonly taxesService: TaxesService,
    private readonly itemsService: ItemsService,
    private readonly partiesService: PartiesService
  ) {
    this.logger = new Logger()
  }

  @Mutation(() => Invoice)
  createInvoice(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput) {
    return this.invoicesService.create(createInvoiceInput)
  }

  @Query(() => [Invoice], { name: 'invoices' })
  async findAllByCompanyId(@Args('companyId') companyId: string) {
    return this.invoicesService.findAllByCompanyId(companyId)
  }

  @Query(() => [InvoiceCountByDateRange], { name: 'getCountByDateRange' })
  getCountByDateRange(
    @Args('invoicesCountByDateRangeInput')
    invoicesCountByDateRangeInput: InvoicesCountByDateRangeInput
  ) {
    const { monthsFromStart, endingDate } = invoicesCountByDateRangeInput
    return this.invoicesService.getInvoiceCountByDateRange(
      endingDate ? new Date(endingDate) : undefined,
      monthsFromStart
    )
  }

  @Query(() => Invoice, { name: 'invoice', nullable: true })
  findOne(@Args('id') id: string) {
    return this.invoicesService.findOne(id)
  }

  @Query(() => Invoice, { name: 'invoiceByNo', nullable: true })
  findOneByNo(@Args('no') no: string) {
    return this.invoicesService.findInvoiceWithNo(no)
  }

  @Query(() => Number, { name: 'suggestedNextInvoiceNumber' })
  getNextIncrementedInvoiceNumber() {
    return this.invoicesService.getNextIncrementedInvoiceNumber()
  }

  @Mutation(() => Invoice)
  updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoicesService.update(updateInvoiceInput.id, updateInvoiceInput)
  }

  @Mutation(() => Invoice)
  removeInvoice(@Args('id') id: string) {
    return this.invoicesService.remove(id)
  }

  @Mutation(() => Invoice)
  updateInvoiceStatus(
    @Args('id') id: string,
    @Args({
      name: 'status',
      type: () => InvoiceStatus
    })
    status: AllowedInvoiceStatus
  ) {
    return this.invoicesService.updateStatusByInvoiceId(id, status)
  }

  @ResolveField('company', () => Company, { nullable: true })
  getCompany(@Parent() invoice: Invoice) {
    const { companyId } = invoice
    return this.companiesService.findOne(companyId)
  }

  @ResolveField('party', () => Party)
  getParty(@Parent() invoice: Invoice) {
    const { partyId } = invoice
    return this.partiesService.findOne(partyId)
  }

  @ResolveField('tax', () => Tax, { nullable: true })
  getTax(@Parent() invoice: Invoice) {
    const { taxId } = invoice
    return this.taxesService.findOne(taxId)
  }

  @ResolveField('bank', () => Bank, { nullable: true })
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
