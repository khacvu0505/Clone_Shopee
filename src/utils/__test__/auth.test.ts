import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  clearAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  getProfile,
  setProfile
} from 'src/utils/auth';
import { beforeAll, beforeEach, describe, expect, it, afterEach, afterAll } from 'vitest';
const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTFmNzQxNmQ3YzYyMDM0MDg1MGVkOCIsImVtYWlsIjoiZGVtbzAwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTA0VDAyOjMxOjE2Ljg5OFoiLCJpYXQiOjE2Nzc4OTcwNzYsImV4cCI6MTY3Nzg5ODg3Nn0.QoUyenl7c9lYeIfu6uXuygAGFrCrWKC7xuvgYxJAJ8s';

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTFmNzQxNmQ3YzYyMDM0MDg1MGVkOCIsImVtYWlsIjoiZGVtbzAwMUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTA0VDAyOjMxOjE2Ljg5OFoiLCJpYXQiOjE2Nzc4OTcwNzYsImV4cCI6MTY3NzkwMDY3Nn0.KrD7XYsU8WSDRXAppIwfX3wINEyXS4qXKTQc_yFiCIE';

const profile =
  '{"_id":"64708d941afc2e1a1f967ab6","roles":["User"],"email":"nkkhacvu32@gmail.com","createdAt":"2023-05-26T10:44:36.123Z","updatedAt":"2023-06-12T07:56:46.020Z","__v":0,"avatar":"87f432fd-6a7f-4e0b-b4eb-6b1e3f2d1823.jpeg","date_of_birth":"1989-12-30T17:00:00.000Z","name":"Khắc Vũ","phone":"0399652356"}';

// beforeEach(() => {
//   console.log('goi beforeEach')
// })

// beforeAll: Chỉ chạy trước 1 lần duy nhất trc khi cái describe được gọi
// VD: có 5 describe thì cái beforeEach chỗ này sẽ được gọi 1 lần
// beforeAll(() => {
//   console.log('goi beforeAll')
// })

// beforeEach: chạy trc mỗi lần describe được gọi
// VD: có 5 describe thì cái beforeEach chỗ này sẽ được gọi 5 lần
beforeEach(() => {
  // localStorage chỗ này dùng được là do jsdom
  localStorage.clear();
});

describe('save access_token into LS', () => {
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

describe('save refresh_token into LS', () => {
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

describe('get Profile from LS', () => {
  it('get profile', () => {
    setProfile(JSON.parse(profile));
    expect(JSON.stringify(getProfile())).toEqual(profile);
  });
});

// afterEach(() => {
//   console.log('goi afterEach')
// })

afterAll(() => {
  console.log('goi afterAll');
});
