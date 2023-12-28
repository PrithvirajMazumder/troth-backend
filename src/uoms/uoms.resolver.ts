import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { UomsService } from '@/uoms/uoms.service'
import { Uom } from '@/uoms/entities/uom.entity'
import { CreateUomInput } from '@/uoms/dto/create-uom.input'
import { UpdateUomInput } from '@/uoms/dto/update-uom.input'
import { CompaniesService } from '@/companies/companies.service'
import { Company } from '@/companies/entities/company.entity'

@Resolver(() => Uom)
export class UomsResolver {
  public constructor(
    private readonly uomsService: UomsService,
    private readonly companiesService: CompaniesService
  ) {}

  @Mutation(() => Uom)
  createUom(@Args('createUomInput') createUomInput: CreateUomInput) {
    return this.uomsService.create(createUomInput)
  }

  @Query(() => [Uom], { name: 'uoms' })
  async findAll() {
    return await this.uomsService.findAll()
  }

  @Query(() => Uom, { name: 'uom' })
  findOne(@Args('id') id: string) {
    return this.uomsService.findOne(id)
  }

  @Query(() => [Uom], { name: 'companyUoms' })
  findByCompany(@Args('companyId') companyId: string) {
    return this.uomsService.findByCompanyId(companyId)
  }

  @Mutation(() => Uom)
  updateUom(@Args('updateUomInput') updateUomInput: UpdateUomInput) {
    return this.uomsService.update(updateUomInput.id, updateUomInput)
  }

  @Mutation(() => Uom)
  removeUom(@Args('id') id: string) {
    return this.uomsService.remove(id)
  }

  @ResolveField('company', () => Company)
  getCompany(@Parent() uom: Uom) {
    const { companyId } = uom
    return this.companiesService.findOne(companyId)
  }
}
