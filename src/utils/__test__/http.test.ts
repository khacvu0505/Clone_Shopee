import { saveAccessTokenToLocalStorage, saveRefreshTokenToLocalStorage } from './../auth';
import { HttpStatusCode } from 'axios';
import { getProductList } from 'src/api/product.api';
import { beforeEach, describe, expect, it } from 'vitest';
import { Http } from '../http';
describe('http axios', () => {
  let http = new Http().instance;

  beforeEach(() => {
    localStorage.clear();
    http = new Http().instance;
  });

  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE4VDA2OjM4OjI2LjIyMVoiLCJpYXQiOjE2ODcwNzAzMDYsImV4cCI6MTY4NzA3MjEwNn0.aH-HqEjO62qz7HlDc-qWXv8dGg9HOD7JfOnOsmS8Cjo';

  const refresh_token_365d =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzA4ZDk0MWFmYzJlMWExZjk2N2FiNiIsImVtYWlsIjoibmtraGFjdnUzMkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA2LTE4VDA2OjM4OjI2LjIyMVoiLCJpYXQiOjE2ODcwNzAzMDYsImV4cCI6MTY4NzA3MzkwNn0.HpsdcHoVnmHBKPD7aAWbJHcxqqlcf4PTDPKppOU2azI';

  it('Gọi API', async () => {
    // Không nên đụng đến folder api vì chúng ta test riêng file http thì chỉ nên dùng file http thôi
    // vì lỡ như thư mục api có thay đổi gì đó
    // thì cũng không bị ảnh hưởng đến file test này
    // const res = await getProductList();
    const res = await http.get('/products');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it('Auth Request', async () => {
    // await http.post('/login', {
    //   email: 'demo001@gmail.com',
    //   password: '123456'
    // });
    const res = await http.get('/me');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  // it('Refresh Token', async () => {
  //   saveAccessTokenToLocalStorage(access_token_1s);
  //   saveRefreshTokenToLocalStorage(refresh_token_365d);

  //   // Phải đưa xuống chỗ này là vì để nó tạo http mới
  //   // tạo http mới thì nó sẽ khởi tạo accesstoken và refresh bên class Http
  //   // Sau đó trước mỗi request nó thấy có token thì nó sẽ gán vào header
  //   const httpNew = new Http().instance;

  //   const res = await httpNew.get('/me');
  //   expect(res.status).toBe(HttpStatusCode.Ok);
  // });
});
