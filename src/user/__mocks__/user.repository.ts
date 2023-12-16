import { userStub } from '@/user/tests/stubs/user.stub'

export class UserRepository {
  findOne = jest.fn().mockResolvedValue(userStub())
  find = jest.fn().mockResolvedValue([userStub()])
  findOneAndUpdate = jest.fn().mockResolvedValue(userStub())
  save = jest.fn().mockResolvedValue(userStub())
  findOneAndDelete = jest.fn().mockResolvedValue(userStub())
}
