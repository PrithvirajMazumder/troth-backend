import { Injectable } from '@nestjs/common'
import { CreateInvoiceInput } from '@/invoices/dto/create-invoice.input'
import { UpdateInvoiceInput } from '@/invoices/dto/update-invoice.input'
import { InvoicesRepository } from '@/invoices/invoices.repository'
import { Types } from 'mongoose'

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  create(createInvoiceInput: CreateInvoiceInput) {
    return this.invoicesRepository.save(createInvoiceInput)
  }

  findAllByCompanyId(companyId: string) {
    return this.invoicesRepository.find({ companyId })
  }

  findOne(id: string) {
    const invoiceId = new Types.ObjectId(id)
    return this.invoicesRepository.findOne(invoiceId)
  }

  update(id: string, updateInvoiceInput: UpdateInvoiceInput) {
    const invoiceId = new Types.ObjectId(id)
    return this.invoicesRepository.findOneAndUpdate(invoiceId, updateInvoiceInput)
  }

  remove(id: string) {
    const invoiceId = new Types.ObjectId(id)
    return this.invoicesRepository.findOneAndDelete(invoiceId)
  }
}
