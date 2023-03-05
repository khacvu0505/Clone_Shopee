import axios, { type AxiosInstance, AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
  getProfile,
  setProfile,
  saveRefreshTokenToLocalStorage,
  getRefreshTokenFromLocalStorage
} from './auth'
import { path } from 'src/constant/path'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/api/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizeError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenQuest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenQuest = null

    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 30 * 60, //30 minutes
        'expire-refresh-token': 60 * 60 // 60 minutes: 60 *60
      }
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
        const routes = [URL_LOGIN, URL_REGISTER]
        if (routes.includes(url)) {
          const data = (response.data as AuthResponse).data
          this.accessToken = data.access_token
          this.refreshToken = data.refresh_token

          saveAccessTokenToLocalStorage(this.accessToken)
          saveRefreshTokenToLocalStorage(this.refreshToken)

          setProfile(data.user)
        }

        if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''

          clearAccessTokenFromLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải của 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized(401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn
        if (isAxiosUnauthorizeError<ErrorResponse<{ name: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const url = config?.url || ''
          // Trường hợp token hết hạn và request k phải gọi refreshToken
          // Thì chúng ta mới gọi refresh
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenQuest = this.refreshTokenQuest ? this.refreshTokenQuest : this.handleRefreshToken()
            return this.refreshTokenQuest
              ?.then((accessToken) => {
                // if (config) config.headers.Authorization = accessToken
                // Chỗ này có nghĩa là chúng ta tiếp tục gọi lại request cũ bị lỗi
                return this.instance({ ...config, headers: { ...config.headers, Authorization: accessToken } })
              })
              .finally(() => {
                this.refreshTokenQuest = null
              })
          }

          // Còn những trường hợp token không đúng
          // không truyền token
          // token hết hạn nhưng gọi refresh token bị fail
          // THÌ tiến hành xóa localStoraeg và toast
          clearAccessTokenFromLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.message)
        }
        if (error) return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken = () => {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        saveAccessTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
