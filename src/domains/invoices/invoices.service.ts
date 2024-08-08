import { Injectable } from '@nestjs/common'
import { CreateInvoiceInput } from '@/domains/invoices/dto/create-invoice.input'
import { UpdateInvoiceInput } from '@/domains/invoices/dto/update-invoice.input'
import { InvoicesRepository } from '@/domains/invoices/invoices.repository'
import { Types } from 'mongoose'
import { InvoiceStatus } from '@/domains/invoices/constants/allowedInvoiceStatus'

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  create(createInvoiceInput: CreateInvoiceInput) {
    return this.invoicesRepository.save({ ...createInvoiceInput, status: InvoiceStatus.Draft })
  }

  async findAllByCompanyId(companyId: string) {
    return this.invoicesRepository.find({ companyId }).sort({ createdAt: -1 })
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

  async getNextIncrementedInvoiceNumber() {
    const latestInvoice = await this.invoicesRepository.findOne({}).sort({ no: -1 }).limit(1)
    return latestInvoice ? latestInvoice?.no + 1 : 1
  }

  findInvoiceWithNo(no: string) {
    return this.invoicesRepository.findOne({ no })
  }
}
