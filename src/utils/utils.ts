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

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

export const removeSpecialCharacters = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacters(name).replace(/\s/g, '-') + '--i-' + id
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('--i-')
  return arr[arr.length - 1]
}
