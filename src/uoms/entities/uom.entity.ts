import { Field, ObjectType } from '@nestjs/graphql'
import { Uom as UomSchema } from '@/uoms/schemas/uom.schema'
import { Company } from '@/companies/entities/company.entity'

@ObjectType()
export class Uom extends UomSchema {
  @Field()
  id: string

  @Field()
  abbreviation: string

  @Field()
  name: string

  @Field(() => Company)
  company: Company
}
