import { Query, Resolver } from '@nestjs/graphql'
import { StatesService } from './states.service'
import { State } from '@/domains/states/entities/states.schema'

@Resolver()
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}

  @Query(() => [State], { name: 'indianStates' })
  findAll() {
    return this.statesService.getIndianSates()
  }
}
