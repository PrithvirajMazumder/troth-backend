import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Party as PartySchema } from '@/parties/schemas/party.schema'
import { Company } from '@/companies/entities/company.entity'

@ObjectType()
export class Party extends PartySchema {
  @Field()
  id: string

  @Field()
  addressLine1: string

  @Field({ nullable: true })
  addressLine2?: string

  @Field(() => Int)
  zipCode: number

  @Field()
  name: string

  @Field()
  state: string

  @Field()
  gstin: string

  @Field()
  city: string

  @Field(() => [String])
  partyItemIds: Array<string>

  @Field(() => Company)
  company: Company
}
