import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  legalName: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  name: string

  @Field(() => Int, { nullable: true })
  phone: number
}
