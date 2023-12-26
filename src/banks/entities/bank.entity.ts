import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Bank as BankSchema } from '@/banks/schemas/bank.schema'

@ObjectType()
export class Bank extends BankSchema {
  @Field({ nullable: false, name: 'id' })
  _id: string

  @Field(() => Int, { nullable: false })
  accountNumber: number

  @Field({ nullable: false })
  branch: string

  @Field({ nullable: false })
  name: string

  @Field({ nullable: false })
  ifsc: string
}
