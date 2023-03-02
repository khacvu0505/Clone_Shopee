import { User } from 'src/types/user.type'
import { SuccessResponse } from './../types/utils.type'
import http from 'src/utils/http'

export interface BodyUpdateProfile extends Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'roles'> {
  new_password?: string
  password?: string
}

export const getProfile = () => {
  return http.get<SuccessResponse<User>>('/me')
}

export const updateProfile = (body: BodyUpdateProfile) => {
  return http.put<SuccessResponse<User>>('/user', body)
}

export const uploadAvatar = (body: FormData) => {
  return http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
