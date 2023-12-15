import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

export abstract class EntityRepository<T extends Document> {
  public constructor(protected readonly entityModel: Model<T>) {}

  public async findOne(
    filterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.entityModel
      .findOne(filterQuery, {
        _id: 0,
        __v: 0,
        ...projection
      })
      .exec()
  }

  public async findMany(filterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(filterQuery).exec()
  }

  public async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData)
    return entity.save()
  }

  public async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    createEntityData: UpdateQuery<unknown>
  ): Promise<T> {
    return this.entityModel.findByIdAndUpdate(filterQuery, createEntityData, { new: true })
  }

  public async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(filterQuery)
    return deleteResult.deletedCount >= 1
  }
}
