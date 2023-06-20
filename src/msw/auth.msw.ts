import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import config from 'src/constant/config';
import { URL_REFRESH_TOKEN } from 'src/api/auth.api';

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE4VDA2OjM4OjI2LjIyMVoiLCJpYXQiOjE2ODcwNzAzMDYsImV4cCI6MTY4NzA3MjEwNn0.aH-HqEjO62qz7HlDc-qWXv8dGg9HOD7JfOnOsmS8Cjo';

export const refresh_token_365d =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE4VDA2OjM4OjI2LjIyMVoiLCJpYXQiOjE2ODcwNzAzMDYsImV4cCI6MTY4NzA3MzkwNn0.HpsdcHoVnmHBKPD7aAWbJHcxqqlcf4PTDPKppOU2azI';

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE5VDAxOjM3OjQ4LjM2NVoiLCJpYXQiOjE2ODcxMzg2NjgsImV4cCI6MTc4NzEzODY2N30.sm-6zuWmvewWQHjJZrQXioREe45p-a_xaWs9a4zRRDY',
    expires: 99999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE5VDAxOjM3OjQ4LjM2NVoiLCJpYXQiOjE2ODcxMzg2NjgsImV4cCI6MTAxNjg3MTM4NjY3fQ.d_LNCBf2k2pYEvN9fTIdhlmkkHbUfolM7oYnt0IPF1Y',
    expires_refresh_token: 99999999999,
    user: {
      _id: '64708d941afc2e1a1f967ab6',
      roles: ['User'],
      email: 'nkkhacvu32@gmail.com',
      createdAt: '2023-05-26T10:44:36.123Z',
      updatedAt: '2023-06-12T07:56:46.020Z',
      __v: 0,
      avatar: '87f432fd-6a7f-4e0b-b4eb-6b1e3f2d1823.jpeg',
      date_of_birth: '1989-12-30T17:00:00.000Z',
      name: 'Khắc Vũ',
      phone: '0399652356'
    }
  }
};

const refreshTokenResponse = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE5VDAyOjAxOjI4LjEwNloiLCJpYXQiOjE2ODcxNDAwODgsImV4cCI6MTY4Nzc0NDg4OH0.7iDxYOCjD4U-MBCBESJyW_01aDSVHrPvQMbzCWpfQ2k'
  }
};

const loginRequest = rest.post(`${config.baseUrl}/login`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(loginResponse));
});

const refreshToken = rest.post(`${config.baseUrl}/${URL_REFRESH_TOKEN}`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(refreshTokenResponse));
});

const authRequests = [loginRequest, refreshToken];
export default authRequests;
