import { CreateCompanyInput } from '@/companies/dto/create-company.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field()
  id: string
}
