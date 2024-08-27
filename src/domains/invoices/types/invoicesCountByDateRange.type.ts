import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDateString } from 'class-validator'

@InputType()
export class InvoicesCountByDateRangeInput {
  @IsDateString()
  @Field(() => String, {
    nullable: true
  })
  endingDate?: string

  @Field(() => Int, { nullable: true })
  monthsFromStart?: number
}
