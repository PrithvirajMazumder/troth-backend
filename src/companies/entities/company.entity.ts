import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Company as CompanySchema } from '@/companies/schemas/company.schema'
import { User } from '@/users/entities/user.entity'
import { Bank } from '@/banks/entities/bank.entity'

@ObjectType()
export class Company extends CompanySchema {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  legalName: string

  @Field()
  city: string

  @Field()
  state: string

  @Field()
  addressLine1: string

  @Field({ nullable: true })
  addressLine2: string

  @Field()
  zipCode: number

  @Field()
  gstin: string

  @Field(() => Int, { nullable: true })
  totalGrossInvoiceAmount: number

  @Field(() => Int, { nullable: true })
  totalNetChallanAmount: number

  @Field(() => Int, { nullable: true })
  totalGrossChallanAmount: number

  @Field(() => Int, { nullable: true })
  totalNetInvoiceAmount: number

  @Field(() => User)
  user: User

  @Field(() => Bank)
  bank: Bank
}
