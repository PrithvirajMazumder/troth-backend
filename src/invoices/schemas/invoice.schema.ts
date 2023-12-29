import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Item } from '@/items/schemas/item.schema'
import { Tax } from '@/taxes/schemas/tax.schema'
import { Bank } from '@/banks/schemas/bank.schema'

@Schema()
export class InvoiceItem {
  @Prop({ required: true })
  quantity: number

  @Prop({ required: true })
  price: number

  @Prop({ required: true, type: Types.ObjectId, ref: Item.name })
  itemId: string
}

export type InvoiceDocument = Invoice & Document

@Schema()
export class Invoice {
  @Prop({ required: true })
  no: string

  @Prop({ required: true })
  companyId: string

  @Prop({ required: true })
  partyId: string

  @Prop({ required: true, type: [InvoiceItem], ref: InvoiceItem.name })
  invoiceItems: Array<InvoiceItem>

  @Prop({ required: true, type: Types.ObjectId, ref: Tax.name })
  taxId: string

  @Prop({ required: true })
  vehicleNumber: string

  @Prop({ required: true, type: Types.ObjectId, ref: Bank.name })
  bankId: string
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice)
