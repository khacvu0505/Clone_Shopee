import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError(error: unknown): error is AxiosError {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntity<FormData>(error: unknown): error is AxiosError<FormData> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(number: number) {
  return `₫ ${new Intl.NumberFormat('de-DE').format(number)}`
}

export function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact'
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}
