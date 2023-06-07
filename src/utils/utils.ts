import { ErrorResponse } from './../types/utils.type';
import axios, { AxiosError, HttpStatusCode } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizeError<UnauthorizeError>(error: unknown): error is AxiosError<UnauthorizeError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizeError>(error: unknown): error is AxiosError<UnauthorizeError> {
  return (
    isAxiosUnauthorizeError<ErrorResponse<{ name: string }>>(error) &&
    error.response?.data.data?.name === 'EXPIRED_TOKEN'
  );
}

export function formatCurrency(number: number) {
  return `₫ ${new Intl.NumberFormat('de-DE').format(number)}`;
}

export function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact'
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase();
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%';
}

export const removeSpecialCharacters = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');
};

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacters(name).replace(/\s/g, '-') + '--i-' + id;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('--i-');
  return arr[arr.length - 1];
};

export const getUrlAvatar = (url: string) => {
  return `https://api-ecom.duthanhduoc.com/images/${url}`;
};

export const demo = (value: number) => {
  let number = 0;
  if (value < 10) {
    number++;
  }
  if (value % 2 === 0) {
    number++;
  }
  return number;
};
