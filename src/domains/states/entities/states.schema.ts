import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class State {
  @Field(() => String, {
    description: 'This field will be used to display the actual name of the state'
  })
  displayName: string

  @Field(() => String, { description: 'This is a unique identifier of a state' })
  value: string
}
