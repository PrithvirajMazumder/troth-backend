import { CreateUserInput } from '@/users/dto/create-user.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  id: string
}
