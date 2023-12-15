import { MockModel } from '@/db/tests/support/mock.mode'
import { User } from '@/user/schemas/user.schema'
import { userStub, usersStubs } from '@/user/tests/stubs/user.stub'

export class UserModel extends MockModel<User> {
  protected entityStub: User = userStub()

  public find(): { exec: () => User[] } {
    return {
      exec: () => usersStubs()
    }
  }
}
