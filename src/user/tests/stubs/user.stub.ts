import { User } from '@/user/schemas/user.schema'

export const userStub = (): User => ({
  email: 'p@p.com',
  name: 'prithviraj mazumder',
  phone: 1234567890
})

export const usersStubs = (): User[] => [
  userStub(),
  {
    email: 'e@e.com',
    name: 'escon engineering',
    phone: 9876543210
  }
]
