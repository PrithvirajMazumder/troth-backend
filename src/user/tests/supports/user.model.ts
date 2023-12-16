import { MockModel } from '@/db/tests/support/mock.model'
import { User } from '@/user/schemas/user.schema'
import { userStub } from '@/user/tests/stubs/user.stub'

export class UserModel extends MockModel<User> {
  protected entityStub: User = userStub()
}
