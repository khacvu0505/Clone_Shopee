import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  clearAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage
} from 'src/utils/auth';
import { beforeAll, beforeEach, describe, expect, it, afterEach, afterAll } from 'vitest';
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTFmNzQxNmQ3YzYyMDM0MDg1MGVkOCIsImVtYWlsIjoiZGVtbzAwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTA0VDAyOjMxOjE2Ljg5OFoiLCJpYXQiOjE2Nzc4OTcwNzYsImV4cCI6MTY3Nzg5ODg3Nn0.QoUyenl7c9lYeIfu6uXuygAGFrCrWKC7xuvgYxJAJ8s';

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTFmNzQxNmQ3YzYyMDM0MDg1MGVkOCIsImVtYWlsIjoiZGVtbzAwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTA0VDAyOjMxOjE2Ljg5OFoiLCJpYXQiOjE2Nzc4OTcwNzYsImV4cCI6MTY3NzkwMDY3Nn0.KrD7XYsU8WSDRXAppIwfX3wINEyXS4qXKTQc_yFiCIE';

const profile =
  '{"_id":"63e1f7416d7c620340850ed8","roles":["User"],"email":"demo001@gmail.com","createdAt":"2023-02-07T07:01:21.683Z","updatedAt":"2023-03-01T14:29:50.338Z","__v":0,"date_of_birth":"1989-12-30T17:00:00.000Z","name":"khacvu updated","phone":"0399652356"}';

// beforeEach(() => {
//   console.log('goi beforeEach')
// })

// beforeAll(() => {
//   console.log('goi beforeAll')
// })

beforeEach(() => {
  // localStorage chỗ này dùng được là do jsdom
  localStorage.clear();
});

describe('access_token', () => {
  // Chỗ này là gọi trước mỗi thằng it bên trong describe này
  // VD chỗ này có 2 cái it thì nó sẽ được gọi 2 lần
  beforeEach(() => {
    console.log('goi beforeEach inside describe');
  });
  it('access_token được set vào local storage', () => {
    saveAccessTokenToLocalStorage(access_token);
    expect(getAccessTokenFromLocalStorage()).toBe(access_token);
  });
});

describe('refresh_token', () => {
  it('refresh_token được set vào local storage', () => {
    saveRefreshTokenToLocalStorage(refresh_token);
    expect(getRefreshTokenFromLocalStorage()).toEqual(refresh_token);
  });
});

// describe('getAccessTokenFromLS', () => {
//   it('get access_token ', () => {
//     saveAccessTokenToLocalStorage(access_token)
//     expect(localStorage.getItem('access_token')).toEqual(access_token)
//   })
// })

// describe('getRefreshTokenFromLS', () => {
//   it('get refresh_token ', () => {
//     saveAccessTokenToLocalStorage(refresh_token)
//     expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
//   })
// })

describe('clearLS', () => {
  it('Xóa access_token, refresh_token, profile', () => {
    clearAccessTokenFromLocalStorage();
    expect(getAccessTokenFromLocalStorage()).toBe('');
    expect(getRefreshTokenFromLocalStorage()).toBe('');
  });
});

// afterEach(() => {
//   console.log('goi afterEach')
// })

afterAll(() => {
  console.log('goi afterAll');
});
