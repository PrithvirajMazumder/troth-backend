import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '@/user/user.controller'
import { User } from '@/user/schemas/user.schema'
import { UserService } from '@/user/user.service'
import { userStub } from './stubs/user.stub'
import { createMock } from '@golevelup/ts-jest'
import { Response } from 'express'
import { Types } from 'mongoose'
import { instanceToPlain } from 'class-transformer'
import { UserDto } from '@/user/dtos/user.dto'

jest.mock('../user.service')
describe('UserController', () => {
  let userController: UserController
  let userService: UserService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('getAll', () => {
    let users: Response<User>

    beforeEach(async () => {
      const response = createMock<Response>({
        json: jest.fn().mockReturnValue([userStub()]),
        status: (_: number) => response
      })
      users = await userController.getAll(response)
    })

    it('should call the userService', () => {
      expect(userService.getAll).toHaveBeenCalled()
    })

    it('should return list of users', () => {
      expect(users).toEqual([userStub()])
    })
  })

  describe('getById', () => {
    let user: Response<User>
    const userId: string = new Types.ObjectId().toHexString()

    beforeEach(async () => {
      const response = createMock<Response>({
        json: jest.fn().mockReturnValue(userStub()),
        status: (_: number) => response
      })
      user = await userController.getById(userId, response)
    })

    it('should call UserService', () => {
      expect(userService.getById).toHaveBeenCalledWith(userId)
    })

    it('should return a newly created user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('create', () => {
    let createdUser: Response
    const newUser = userStub()

    beforeEach(async () => {
      const response: Response<User> = createMock<Response>({
        json: jest.fn().mockReturnValue(newUser),
        status: (_: number) => response
      })
      createdUser = await userController.create(newUser, response)
    })

    it('should call UserService', () => {
      expect(userService.create).toHaveBeenCalledWith(newUser)
    })

    it('should return new created user', () => {
      expect(createdUser).toEqual(instanceToPlain(new UserDto(newUser)))
    })
  })
})
