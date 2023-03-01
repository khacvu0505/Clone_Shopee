import axios, { type AxiosInstance, AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
  getProfile,
  setProfile
} from './auth'
import { path } from 'src/constant/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    // interceptors request
    this.instance.interceptors.request.use(
      (config) => {
        // Làm gì đó trước khi request dược gửi đi
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        // Làm gì đó với lỗi request
        return Promise.reject(error)
      }
    )

    // Thêm một bộ đón chặn response
    this.instance.interceptors.response.use(
      (response) => {
        const { url = '' } = response.config
        const routes = [path.login, path.register]
        if (routes.includes(url)) {
          const data = (response.data as AuthResponse).data
          this.accessToken = data.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
          setProfile(data.user)
        }

        if (url === path.logout) {
          this.accessToken = ''
          clearAccessTokenFromLocalStorage()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearAccessTokenFromLocalStorage()
        }
        if (error) return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
