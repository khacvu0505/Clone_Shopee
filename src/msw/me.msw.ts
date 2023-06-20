import { rest } from 'msw';
import config from 'src/constant/config';

const meResponse = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '64708d941afc2e1a1f967ab6',
    roles: ['User'],
    email: 'nkkhacvu32@gmail.com',
    createdAt: '2023-05-26T10:44:36.123Z',
    updatedAt: '2023-06-12T07:56:46.020Z',
    avatar: '87f432fd-6a7f-4e0b-b4eb-6b1e3f2d1823.jpeg',
    date_of_birth: '1989-12-30T17:00:00.000Z',
    name: 'Khắc Vũ',
    phone: '0399652356'
  }
};

const meRquest = rest.get(`${config.baseUrl}/me`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(meResponse));
});

const meRequests = [meRquest];
export default meRequests;
