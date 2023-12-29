import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Invoice as InvoiceSchema,
  InvoiceItem as InvoiceItemSchema
} from '@/domains/invoices/schemas/invoice.schema'
import { Party } from '@/domains/parties/entities/party.entity'
import { Company } from '@/domains/companies/entities/company.entity'
import { Tax } from '@/domains/taxes/entities/tax.entity'
import { Bank } from '@/domains/banks/entities/bank.entity'
import { Item } from '@/domains/items/entities/item.entity'

@ObjectType()
export class InvoiceItem extends InvoiceItemSchema {
  @Field(() => Int)
  quantity: number

  @Field(() => Item)
  item: Item

  @Field(() => Int)
  price: number
}

@ObjectType()
export class Invoice extends InvoiceSchema {
  @Field()
  id: string

  @Field(() => [InvoiceItem])
  invoiceItems: Array<InvoiceItem>

  @Field(() => Party)
  party: Party

  @Field()
  vehicleNumber: string

  @Field(() => Company)
  company: Company

  @Field(() => Tax)
  tax: Tax

  @Field()
  no: string

  @Field(() => Bank)
  bank: Bank
}
