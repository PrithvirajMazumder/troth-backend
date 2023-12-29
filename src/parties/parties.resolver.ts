import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql'
import { PartiesService } from './parties.service'
import { Party } from './entities/party.entity'
import { CreatePartyInput } from './dto/create-party.input'
import { UpdatePartyInput } from './dto/update-party.input'
import { CompaniesService } from '@/companies/companies.service'
import { Company } from '@/companies/entities/company.entity'

@Resolver(() => Party)
export class PartiesResolver {
  constructor(
    private readonly partiesService: PartiesService,
    private readonly companiesService: CompaniesService
  ) {}

  @Mutation(() => Party)
  createParty(@Args('createPartyInput') createPartyInput: CreatePartyInput) {
    return this.partiesService.create(createPartyInput)
  }

  @Query(() => [Party], { name: 'parties' })
  findAllByCompanyId(@Args('companyId') companyId: string) {
    return this.partiesService.findAllByCompanyId(companyId)
  }

  @Query(() => Party, { name: 'party' })
  findOne(@Args('id') id: string) {
    return this.partiesService.findOne(id)
  }

  @Mutation(() => Party)
  updateParty(@Args('updatePartyInput') updatePartyInput: UpdatePartyInput) {
    return this.partiesService.update(updatePartyInput.id, updatePartyInput)
  }

  @Mutation(() => Party)
  removeParty(@Args('id') id: string) {
    return this.partiesService.remove(id)
  }

  @ResolveField('company', () => Company)
  getCompany(@Parent() party: Party) {
    const { companyId } = party
    return this.companiesService.findOne(companyId)
  }
}
