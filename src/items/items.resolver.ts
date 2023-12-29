import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ItemsService } from '@/items/items.service'
import { Item } from '@/items/entities/item.entity'
import { CreateItemInput } from '@/items/dto/create-item.input'
import { UpdateItemInput } from '@/items/dto/update-item.input'
import { UomsService } from '@/uoms/uoms.service'
import { CompaniesService } from '@/companies/companies.service'
import { TaxesService } from '@/taxes/taxes.service'
import { Company } from '@/companies/entities/company.entity'
import { Tax } from '@/taxes/entities/tax.entity'
import { Uom } from '@/uoms/entities/uom.entity'

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly uomsService: UomsService,
    private readonly companiesService: CompaniesService,
    private readonly taxesService: TaxesService
  ) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput)
  }

  @Query(() => [Item], { name: 'items' })
  findAllByCompanyId(@Args('companyId') companyId: string) {
    return this.itemsService.findAllByCompanyId(companyId)
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id') id: string) {
    return this.itemsService.findOne(id)
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput)
  }

  @Mutation(() => Item)
  removeItem(@Args('id') id: string) {
    return this.itemsService.remove(id)
  }

  @ResolveField('company', () => Company)
  getCompany(@Parent() item: Item) {
    const { companyId } = item
    return this.companiesService.findOne(companyId)
  }

  @ResolveField('tax', () => Tax)
  getTax(@Parent() item: Item) {
    const { taxId } = item
    return this.taxesService.findOne(taxId)
  }

  @ResolveField('uom', () => Uom)
  async getUom(@Parent() item: Item) {
    const { uomId } = item
    return await this.uomsService.findOne(uomId)
  }
}
