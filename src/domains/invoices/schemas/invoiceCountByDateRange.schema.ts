import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class InvoiceCountByDateRange {
  @Field()
  date: string

  @Field()
  count: number
}
