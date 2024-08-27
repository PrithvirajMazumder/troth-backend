import { Injectable, Logger } from '@nestjs/common'
import { EntityRepository } from '@/db/entity.repository'
import { Invoice, InvoiceDocument } from '@/domains/invoices/schemas/invoice.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { subMonths } from 'date-fns'

@Injectable()
export class InvoicesRepository extends EntityRepository<InvoiceDocument> {
  private logger: Logger

  constructor(@InjectModel(Invoice.name) invoiceModel: Model<InvoiceDocument>) {
    super(invoiceModel)
    this.logger = new Logger()
  }

  async getInvoiceCountByMonthAndYear(endingDate: Date, monthsFromStart: number) {
    const startingDate = subMonths(endingDate, monthsFromStart)
    return this.entityModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startingDate,
            $lte: endingDate
          }
        }
      },
      {
        $sort: {
          createdAt: 1
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%d/%m/%Y',
              date: '$createdAt'
            }
          },
          count: {
            $sum: 1
          }
        }
      }
    ])
  }
}
