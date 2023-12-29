import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Item as ItemSchema } from '@/items/schemas/item.schema'
import { Company } from '@/companies/entities/company.entity'
import { Tax } from '@/taxes/entities/tax.entity'
import { Uom } from '@/uoms/entities/uom.entity'

@ObjectType()
export class Item extends ItemSchema {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => Int, { nullable: true })
  hsn: number

  @Field(() => Company)
  company: Company

  @Field(() => Tax)
  tax: Tax

  @Field(() => Uom)
  uom: Uom
}
