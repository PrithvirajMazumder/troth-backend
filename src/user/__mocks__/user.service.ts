import { userStub } from '../tests/stubs/user.stub'

export class UserService {
  public getAll = jest.fn().mockResolvedValue([userStub()])
  public getById = jest.fn().mockResolvedValue(userStub())
  public create = jest.fn().mockResolvedValue(userStub())
}
