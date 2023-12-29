import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tax as TaxSchema } from '@/domains/taxes/schemas/tax.schema'

@ObjectType()
export class Tax extends TaxSchema{
  @Field()
  id: string

  @Field(() => Int)
  cgst: number

  @Field(() => Int)
  sgst: number
}
