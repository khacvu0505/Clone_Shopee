import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import config from './src/constant/config';
import authRequests from './src/msw/auth.msw';
import productRequests from './src/msw/product.msw';
import meRequests from './src/msw/me.msw';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE5VDAwOjQxOjMzLjgzN1oiLCJpYXQiOjE2ODcxMzUyOTMsImV4cCI6MTc4NzEzNTI5Mn0.ZLuEjQGePkzuAQeAuBa4UfxtaiP0FtHBQZ9A6fcBL_Q',
    expires: 99999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE5VDAwOjQxOjMzLjgzN1oiLCJpYXQiOjE2ODcxMzUyOTMsImV4cCI6MTAxNjg3MTM1MjkyfQ.f1wGma5X7rT6jZGwhoCx7tgt-gvr8RmdoD-AYGdQglc',
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

export const restHandlers = [
  rest.post(`${config.baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(loginResponse));
  })
];

const server = setupServer(...authRequests, ...productRequests, ...meRequests);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
