import { Injectable } from '@nestjs/common'
import { CreateInvoiceInput } from '@/domains/invoices/dto/create-invoice.input'
import { UpdateInvoiceInput } from '@/domains/invoices/dto/update-invoice.input'
import { InvoicesRepository } from '@/domains/invoices/invoices.repository'
import { Types } from 'mongoose'
import {
  AllowedInvoiceStatus,
  InvoiceStatus
} from '@/domains/invoices/constants/allowedInvoiceStatus'
import { eachDayOfInterval, format, subMonths } from 'date-fns'

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  create(createInvoiceInput: CreateInvoiceInput) {
    return this.invoicesRepository.save({
      ...createInvoiceInput,
      status: InvoiceStatus.Draft
    })
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

  updateStatusByInvoiceId(id: string, status: AllowedInvoiceStatus) {
    const invoiceId = new Types.ObjectId(id)
    return this.invoicesRepository.findOneAndUpdate(invoiceId, { status })
  }

  findInvoiceWithNo(no: string) {
    return this.invoicesRepository.findOne({ no })
  }

  async getInvoiceCountByDateRange(endingDate = new Date(), monthsFromStart = 6) {
    const invoicesCount = await this.invoicesRepository.getInvoiceCountByMonthAndYear(
      endingDate,
      monthsFromStart
    )
    const interval = {
      start: subMonths(endingDate, monthsFromStart),
      end: endingDate
    }
    const days = eachDayOfInterval(interval)
    return days.map((day) => {
      const dateStr = format(day, 'dd/MM/yyyy')
      const invoicesCountMap = invoicesCount[0]
      return {
        date: dateStr,
        count: invoicesCountMap[dateStr] ? invoicesCountMap[dateStr]?.count : 0
      }
    })
  }
}
