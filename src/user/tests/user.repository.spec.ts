import { User } from '@/user/schemas/user.schema'
import { UserModel } from '@/user/tests/supports/user.model'
import { getModelToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Types } from 'mongoose'
import { userStub, usersStubs } from '@/user/tests/stubs/user.stub'
import { UserRepository } from '@/user/user.repository'

describe('UserRepository', () => {
  let userRepository: UserRepository
  const filterQuery = { _id: new Types.ObjectId() }

  describe('find operations', () => {
    let userModel: UserModel

    beforeEach(async () => {
      const userModule = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel
          }
        ]
      }).compile()

      userRepository = userModule.get<UserRepository>(UserRepository)
      userModel = userModule.get<UserModel>(getModelToken(User.name))

      jest.clearAllMocks()
    })

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOne')
          user = await userRepository.findOne(filterQuery)
        })

        test('then it should call the userModel', () => {
          expect(userModel.findOne).toHaveBeenCalledWith(filterQuery)
        })

        test('then it should call return a user', () => {
          expect(user).toEqual(userStub())
        })
      })
    })

    describe('find', () => {
      describe('when find is called', () => {
        let users: User[]

        beforeEach(async () => {
          jest.spyOn(userModel, 'find')
          users = await userRepository.find({})
        })

        test('then it should call the userModel', () => {
          expect(userModel.find).toHaveBeenCalled()
        })

        test('then it should return users', () => {
          expect(users).toEqual(usersStubs())
        })
      })
    })

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate')
          user = await userRepository.findOneAndUpdate(filterQuery, userStub())
        })

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(filterQuery, userStub())
        })

        test('then it should return new updated user', () => {
          expect(user).toEqual(userStub)
        })
      })
    })

    describe('findOneAndDelete', () => {
      describe('when findOneAndDelete is called', () => {
        let isDeleted: boolean

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate')
          isDeleted = await userRepository.findOneAndDelete(filterQuery)
        })

        test('then it should call the userModel', () => {
          expect(userModel.findOneAndDelete).toHaveBeenCalledWith(filterQuery)
        })

        test('then it should return true if it is found and deleted', () => {
          expect(isDeleted).toEqual(true)
        })
      })
    })
  })

  describe('save operations', () => {
    beforeEach(async () => {
      const userModule = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel
          }
        ]
      }).compile()

      userRepository = userModule.get<UserRepository>(UserRepository)
    })

    describe('save', () => {
      describe('when save is called', () => {
        let user: User
        let saveSpy: jest.SpyInstance
        let constructorSpy: jest.SpyInstance

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'save')
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy')
          user = await userRepository.save(userStub())
        })

        test('then it should call the userModel', () => {
          expect(saveSpy).toHaveBeenCalled()
          expect(constructorSpy).toHaveBeenCalledWith(userStub())
        })

        test('then it should return the user', () => {
          expect(user).toEqual(userStub())
        })
      })
    })
  })
})
