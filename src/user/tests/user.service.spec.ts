import { UserService } from '@/user/user.service'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '@/user/user.repository'
import { User } from '@/user/schemas/user.schema'
import { userStub } from '@/user/tests/stubs/user.stub'
import { Types } from 'mongoose'

jest.mock('../user.repository')

describe('UserService', () => {
  let userService: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UserService, UserRepository]
    }).compile()

    userRepository = module.get<UserRepository>(UserRepository)
    userService = module.get<UserService>(UserService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('getAll is called', () => {
    let users: Array<User>

    beforeEach(async () => {
      users = await userService.getAll()
    })

    it('should call userRepository', async () => {
      expect(userRepository.find).toHaveBeenCalledWith({})
    })

    it('should return list of users', () => {
      expect(users).toEqual([userStub()])
    })
  })

  describe('getById', () => {
    const userId: string = new Types.ObjectId().toHexString()
    let user: User

    beforeEach(async () => {
      user = await userService.getById(userId)
    })

    it('should call userRepository', () => {
      expect(userRepository.findOne).toHaveBeenCalledWith({ _id: new Types.ObjectId(userId) })
    })

    it('should return a user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('create', () => {
    let user: User

    beforeEach(async () => {
      user = await userService.create(userStub())
    })

    it('should call userRepository', () => {
      expect(userRepository.save).toHaveBeenCalledWith(userStub())
    })

    it('should return a user', () => {
      expect(user).toEqual(userStub())
    })
  })
})
