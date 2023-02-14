import { SuccessResponse } from './utils.type'
import { User } from 'src/types/user.type'

export type AuthResponse = SuccessResponse<{
  expires: string
  access_token: string
  user: User
}>
