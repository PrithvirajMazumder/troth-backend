import { Field, InputType, OmitType } from '@nestjs/graphql'
import { Company } from '@/companies/entities/company.entity'

@InputType()
export class CreateCompanyInput extends OmitType(Company, [
  'totalGrossInvoiceAmount',
  'totalGrossChallanAmount',
  'totalNetInvoiceAmount',
  'totalNetChallanAmount',
  'user',
  'bank'
]) {
  @Field()
  userId: string

  @Field()
  bankId: string
}
