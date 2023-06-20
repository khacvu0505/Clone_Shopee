import { rest } from 'msw';
import config from 'src/constant/config';

const productResponse = {
  message: 'Lấy các sản phẩm thành công',
  data: {
    products: [
      {
        _id: '60afae906ef5b902180aacb2',
        images: [
          'https://api-ecom.duthanhduoc.com/images/37256021-1e7c-40f4-8e0f-d665f7cb95bd.jpg',
          'https://api-ecom.duthanhduoc.com/images/cae19f00-7a2a-4d79-9446-2868a613b4b7.jpg',
          'https://api-ecom.duthanhduoc.com/images/314ab003-20e1-455f-a585-7514a388a9ae.jpg',
          'https://api-ecom.duthanhduoc.com/images/eba3ed37-74f2-460e-84be-c651907b2536.jpg',
          'https://api-ecom.duthanhduoc.com/images/f0255207-359f-44a9-8b06-aea6d80408cd.jpg',
          'https://api-ecom.duthanhduoc.com/images/1939becb-3b6f-4798-b67d-66e9997efee8.jpg',
          'https://api-ecom.duthanhduoc.com/images/5990d6b5-894b-4c9c-81a2-3f039dd7b867.jpg',
          'https://api-ecom.duthanhduoc.com/images/3b5f3f84-6ff0-454f-bafb-883fce1cc3f9.jpg',
          'https://api-ecom.duthanhduoc.com/images/e97515b5-d474-40c9-b984-28d6b3ffbd08.jpg'
        ],
        price: 199000,
        rating: 5,
        price_before_discount: 250000,
        quantity: 3091,
        sold: 2500,
        view: 3332,
        name: 'Đồng Hồ Nam FNGEEN Dây Thép Cao Cấp Không Gỉ, Có Lịch Ngày, Phong Cách Doanh Nhân Sang Trọng',
        category: {
          _id: '60afacca6ef5b902180aacaf',
          name: 'Đồng hồ',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/37256021-1e7c-40f4-8e0f-d665f7cb95bd.jpg',
        createdAt: '2021-05-27T14:37:04.282Z',
        updatedAt: '2023-06-20T01:19:04.408Z'
      },
      {
        _id: '60afadff6ef5b902180aacb1',
        images: [
          'https://api-ecom.duthanhduoc.com/images/a7dfed1e-6beb-4390-af5e-24413bf619a6.jpg',
          'https://api-ecom.duthanhduoc.com/images/29fe140f-3280-4724-a246-ede984d75559.jpg',
          'https://api-ecom.duthanhduoc.com/images/c500e2d3-85ab-4cbb-b3b0-bd4b622a2cb2.jpg',
          'https://api-ecom.duthanhduoc.com/images/70ac3d12-9f6a-4447-8283-58fd9d63e319.jpg',
          'https://api-ecom.duthanhduoc.com/images/e00804e6-6884-47ca-acb0-0bd9a246266a.jpg',
          'https://api-ecom.duthanhduoc.com/images/534cff9b-d05f-40b2-a777-f043d382fd38.jpg',
          'https://api-ecom.duthanhduoc.com/images/4cce1f66-8393-4f82-b3f0-5e81face5346.jpg',
          'https://api-ecom.duthanhduoc.com/images/07c573b3-67f3-4c59-9ad8-441cb803a9ec.jpg',
          'https://api-ecom.duthanhduoc.com/images/33d2727b-68ed-4454-a1fb-4c66d454dbf7.jpg'
        ],
        price: 260000,
        rating: 5,
        price_before_discount: 500000,
        quantity: 4050,
        sold: 2300,
        view: 1761,
        name: 'Đồng Hồ Điện Tử Thể Thao Nam Chính Hãng SMAEL JAPAN 2020 - Phong Cách Quân Đội',
        category: {
          _id: '60afacca6ef5b902180aacaf',
          name: 'Đồng hồ',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/a7dfed1e-6beb-4390-af5e-24413bf619a6.jpg',
        createdAt: '2021-05-27T14:34:39.366Z',
        updatedAt: '2023-06-20T01:19:04.680Z'
      },
      {
        _id: '60afad846ef5b902180aacb0',
        images: [
          'https://api-ecom.duthanhduoc.com/images/a04c55a2-9569-4a59-a6de-2b3bbdcb570a.jpg',
          'https://api-ecom.duthanhduoc.com/images/7d131757-51eb-43af-bc2a-4eb479186fc9.jpg',
          'https://api-ecom.duthanhduoc.com/images/89ca357b-cd4a-4389-b290-166bb78a987b.jpg',
          'https://api-ecom.duthanhduoc.com/images/869051b5-ce64-4107-82d1-891daa969700.jpg',
          'https://api-ecom.duthanhduoc.com/images/7586bd50-7d86-4fd9-b728-812753fdbe8d.jpg',
          'https://api-ecom.duthanhduoc.com/images/aaf5a147-d8f9-44dd-914c-ba52298fd354.jpg',
          'https://api-ecom.duthanhduoc.com/images/df1c6c76-3658-4657-a678-ca53197cef7e.jpg',
          'https://api-ecom.duthanhduoc.com/images/b117fb99-cc14-4090-9e12-1f269485b80d.jpg',
          'https://api-ecom.duthanhduoc.com/images/cb4f7da2-267f-4dc7-bd6e-aab30e04067a.jpg'
        ],
        price: 229000,
        rating: 5,
        price_before_discount: 399000,
        quantity: 100123,
        sold: 31500,
        view: 7316,
        name: 'Đồng Hồ Nam WWOOR 8018 Dây Thép Nhật Cao Cấp Nhiều Màu',
        category: {
          _id: '60afacca6ef5b902180aacaf',
          name: 'Đồng hồ',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/a04c55a2-9569-4a59-a6de-2b3bbdcb570a.jpg',
        createdAt: '2021-05-27T14:32:36.605Z',
        updatedAt: '2023-06-20T01:19:04.538Z'
      },
      {
        _id: '60af722af1a3041b289d8ba1',
        images: [
          'https://api-ecom.duthanhduoc.com/images/8fdcc6d3-70ea-4853-954e-b8776fbab6fa.jpg',
          'https://api-ecom.duthanhduoc.com/images/531834bf-0bc0-4cdc-941e-9b5204d97b0d.jpg',
          'https://api-ecom.duthanhduoc.com/images/4cec69e1-0cc8-4c2c-8f2e-19340cc89469.jpg',
          'https://api-ecom.duthanhduoc.com/images/fb0cb1b5-8987-4d0b-bf40-428e91cb417c.jpg',
          'https://api-ecom.duthanhduoc.com/images/21643c6a-8e9f-46c7-a587-f7c5aa5034c9.jpg',
          'https://api-ecom.duthanhduoc.com/images/735f43ba-992c-4ace-a3fe-e097da0c8877.jpg',
          'https://api-ecom.duthanhduoc.com/images/e3371592-f52a-43f4-82dc-bc8da71a023b.jpg',
          'https://api-ecom.duthanhduoc.com/images/344baaa7-6507-4a1c-a619-9e199638cbff.jpg',
          'https://api-ecom.duthanhduoc.com/images/37b8be77-cb17-4126-8dae-97ff7bb19014.jpg'
        ],
        price: 194555,
        rating: 4.1,
        price_before_discount: 299999,
        quantity: 75,
        sold: 55,
        view: 2669,
        name: '[KHUYẾN MÃI 35%] Áo Thun POLO Nam, Tay Ngắn Áo Cổ Sọc, Chất Liệu Cá Sấu Cao Cấp - Nhiều màu- Đủ Size',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/8fdcc6d3-70ea-4853-954e-b8776fbab6fa.jpg',
        createdAt: '2021-05-27T10:19:22.177Z',
        updatedAt: '2023-06-20T01:19:04.330Z'
      },
      {
        _id: '60af70fbf1a3041b289d8ba0',
        images: [
          'https://api-ecom.duthanhduoc.com/images/93ac7b62-52e9-4846-9d51-9bc227a96923.jpg',
          'https://api-ecom.duthanhduoc.com/images/555c5f7a-493e-4419-b586-d0a1cb0b6b75.jpg',
          'https://api-ecom.duthanhduoc.com/images/14fca8bf-2c24-4ebb-9ade-e11fd43f0ea3.jpg',
          'https://api-ecom.duthanhduoc.com/images/c43fc98d-ee1e-4b1a-af06-6b9b2771bb7e.jpg',
          'https://api-ecom.duthanhduoc.com/images/6b484bfb-c64f-4bfa-aa77-617a1f7fafa1.jpg',
          'https://api-ecom.duthanhduoc.com/images/0e34d957-2f67-40ef-b504-8bbfdece70b2.jpg',
          'https://api-ecom.duthanhduoc.com/images/dcc1a2d2-1c9a-49ad-86b6-c0f43c033060.jpg',
          'https://api-ecom.duthanhduoc.com/images/d7b6c670-b54f-4cfc-af9e-f2d7f18b821c.jpg',
          'https://api-ecom.duthanhduoc.com/images/7105a40d-4773-44cd-9a2a-f07fba0c6889.jpg'
        ],
        price: 169000,
        rating: 4.5,
        price_before_discount: 279000,
        quantity: 2988,
        sold: 456,
        view: 2112,
        name: 'Áo Thun Polo Kẻ Ngang Trẻ Trung Sành Điệu Áo Phông Nam Có Cổ Tay Cộc Vải 100% Cotton Mềm Mịn Thoáng Mát HK016',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/93ac7b62-52e9-4846-9d51-9bc227a96923.jpg',
        createdAt: '2021-05-27T10:14:19.185Z',
        updatedAt: '2023-06-20T01:30:14.702Z'
      },
      {
        _id: '60af6f7bf1a3041b289d8b9c',
        images: [
          'https://api-ecom.duthanhduoc.com/images/edbdcca1-7a53-47fe-b3b5-4f356992eb36.jpg',
          'https://api-ecom.duthanhduoc.com/images/6d0eac12-c3c2-40e9-b72c-27b3c4b40482.jpg',
          'https://api-ecom.duthanhduoc.com/images/3ffc6422-e0df-46c4-96f2-0c35928be981.jpg',
          'https://api-ecom.duthanhduoc.com/images/14258b71-44a4-4ee9-a2ff-cc260123660c.jpg',
          'https://api-ecom.duthanhduoc.com/images/e82ef1bc-ba16-44f9-938d-edb415e09eee.jpg',
          'https://api-ecom.duthanhduoc.com/images/9e15917b-8b10-483b-9c83-88fc8de6e554.jpg',
          'https://api-ecom.duthanhduoc.com/images/ffc043dd-60ba-48b8-ba4b-d1e8c3f5371c.jpg',
          'https://api-ecom.duthanhduoc.com/images/13cff076-860d-4e98-ad03-049eaf636930.jpg',
          'https://api-ecom.duthanhduoc.com/images/8767ce97-f0de-4f49-9c05-7571dca74edd.jpg'
        ],
        price: 399000,
        rating: 4.2,
        price_before_discount: 500000,
        quantity: 552,
        sold: 11,
        view: 1733,
        name: 'Áo Polo nam HEBOZ vải cotton pha co giãn 4 chiều đẹp in logo cao bên ngực trái cao cấp, form slimfit basic - 00000673',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/edbdcca1-7a53-47fe-b3b5-4f356992eb36.jpg',
        createdAt: '2021-05-27T10:07:55.092Z',
        updatedAt: '2023-06-20T01:19:02.823Z'
      },
      {
        _id: '60af6f12f1a3041b289d8b9b',
        images: [
          'https://api-ecom.duthanhduoc.com/images/b18506cc-3d5f-4160-aee3-8e4242ed5717.jpg',
          'https://api-ecom.duthanhduoc.com/images/0e91ba6d-8e35-4fee-8812-6f81bbe0e3de.jpg',
          'https://api-ecom.duthanhduoc.com/images/519d5750-23b3-4ba1-8fb6-e74bf594c558.jpg',
          'https://api-ecom.duthanhduoc.com/images/3640d703-9add-45b7-b726-767c13cf3238.jpg',
          'https://api-ecom.duthanhduoc.com/images/46b7bebc-6a8d-4fb3-aa63-e9cf550f6490.jpg',
          'https://api-ecom.duthanhduoc.com/images/30273cc8-98fb-4cc6-85e6-02c447e45f4a.jpg'
        ],
        price: 75000,
        rating: 5,
        price_before_discount: 150000,
        quantity: 52,
        sold: 5,
        view: 1804,
        name: 'Áo thun Polo nam cổ bẻ BASIC vải cá sấu Cotton xuất xịn, chuẩn đẹp, màu HỒNG',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/b18506cc-3d5f-4160-aee3-8e4242ed5717.jpg',
        createdAt: '2021-05-27T10:06:10.339Z',
        updatedAt: '2023-06-20T01:30:14.332Z'
      },
      {
        _id: '60ad06ba2fb52902585972b0',
        images: [
          'https://api-ecom.duthanhduoc.com/images/fc830d4a-c616-4928-9b30-ff7cca7fa4d4.jpg',
          'https://api-ecom.duthanhduoc.com/images/c1ede578-0057-4ddc-9d35-9204787f4c8b.jpg',
          'https://api-ecom.duthanhduoc.com/images/118f336b-e59f-459e-ac95-c8db472c5d2b.jpg',
          'https://api-ecom.duthanhduoc.com/images/3aa27e77-8a1e-403a-98bb-7d859f6983cc.jpg',
          'https://api-ecom.duthanhduoc.com/images/a645aea7-e620-4bac-8ee1-09c983222644.jpg',
          'https://api-ecom.duthanhduoc.com/images/971fe2bf-79c5-4fe5-8b8a-abaaa835cfc0.jpg',
          'https://api-ecom.duthanhduoc.com/images/e528251b-9235-4009-b5e3-d870f3072364.jpg',
          'https://api-ecom.duthanhduoc.com/images/231e1ab4-2f14-428a-970c-7da321f01519.jpg',
          'https://api-ecom.duthanhduoc.com/images/24cabe00-da6d-4070-a1ae-5280b00b45e7.jpg'
        ],
        price: 69000,
        rating: 4.958,
        price_before_discount: 139000,
        quantity: 17659,
        sold: 497,
        view: 1137,
        name: '[Mã FAMAYMA2 giảm 10K đơn 50K] Áo Thun ngắn tay unisex Tie Dye, form oversize, vải cotton loang mầu 2SClothing.',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/fc830d4a-c616-4928-9b30-ff7cca7fa4d4.jpg',
        createdAt: '2021-05-25T14:16:26.462Z',
        updatedAt: '2023-06-20T01:19:04.448Z'
      },
      {
        _id: '60ad061d2fb52902585972af',
        images: [
          'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
          'https://api-ecom.duthanhduoc.com/images/8437f3b8-46b7-49b6-a362-0f58691d9ba9.jpg',
          'https://api-ecom.duthanhduoc.com/images/5cb7c7b1-26c2-4c27-8296-b7d945d823dc.jpg',
          'https://api-ecom.duthanhduoc.com/images/03765370-897a-4f89-9f52-3e595fd1401a.jpg',
          'https://api-ecom.duthanhduoc.com/images/6b75401d-ab0d-4b78-a8ea-e2478e54628f.jpg',
          'https://api-ecom.duthanhduoc.com/images/5b78806c-32ca-4ed2-9736-271c28452892.jpg',
          'https://api-ecom.duthanhduoc.com/images/5a38e7b5-9fc8-4bf2-a534-dc65f54083d9.jpg',
          'https://api-ecom.duthanhduoc.com/images/ac2b1da2-4067-4a7f-9509-3cfc399811fc.jpg',
          'https://api-ecom.duthanhduoc.com/images/3a5a1850-4f0f-4c1b-b920-30b6017e2c94.jpg'
        ],
        price: 69000,
        rating: 4.9,
        price_before_discount: 138000,
        quantity: 107962,
        sold: 5655,
        view: 13325,
        name: '[Mã FADI5K245 giảm 5K đơn 0đ] Áo thun tay lỡ Gấu194 unisex form rộng trơn chữ vải coton mềm mịn co dãn 4 chiều - GAU1994',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        createdAt: '2021-05-25T14:13:49.042Z',
        updatedAt: '2023-06-20T01:30:14.747Z'
      },
      {
        _id: '60ad056c2fb52902585972ae',
        images: [
          'https://api-ecom.duthanhduoc.com/images/e647d83e-4d1b-4297-b1cb-2b87bdad7963.jpg',
          'https://api-ecom.duthanhduoc.com/images/f83deef7-4be7-4d7d-91f0-d4dbc2178a88.jpg',
          'https://api-ecom.duthanhduoc.com/images/b7e42549-d22c-4817-907b-405414b2908f.jpg',
          'https://api-ecom.duthanhduoc.com/images/dd0f9992-be2c-40cf-9019-016b4c04d631.jpg',
          'https://api-ecom.duthanhduoc.com/images/cd9a52b3-d01b-4913-a95c-0dadc36e0bee.jpg',
          'https://api-ecom.duthanhduoc.com/images/7559c5c8-9b55-496d-a0b7-6daa9c46cebc.jpg',
          'https://api-ecom.duthanhduoc.com/images/6337ee32-b050-4a04-a5b3-2f378b4b260a.jpg',
          'https://api-ecom.duthanhduoc.com/images/0ce61658-dd39-4dca-9376-c4e3f1f19cb6.jpg',
          'https://api-ecom.duthanhduoc.com/images/5b85ee62-17ec-4726-bc32-dc860415254c.jpg'
        ],
        price: 130000,
        rating: 0,
        price_before_discount: 150000,
        quantity: 6982,
        sold: 0,
        view: 449,
        name: 'Áo Thun Tay Lỡ Form Rộng Mon Mon Siêu Hot🍁 Unisex nam nữ đều mặc được)',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/e647d83e-4d1b-4297-b1cb-2b87bdad7963.jpg',
        createdAt: '2021-05-25T14:10:52.503Z',
        updatedAt: '2023-06-20T01:30:13.929Z'
      },
      {
        _id: '60ad04e32fb52902585972ad',
        images: [
          'https://api-ecom.duthanhduoc.com/images/a1c873c9-a1e3-477e-8a09-e9bd6e43b1cf.jpg',
          'https://api-ecom.duthanhduoc.com/images/a55c3d25-d976-4a13-9cb8-853d86ab5973.jpg',
          'https://api-ecom.duthanhduoc.com/images/f45a3ea7-96f8-46f4-852d-2b649e0e9683.jpg',
          'https://api-ecom.duthanhduoc.com/images/1ade3e4a-521d-479a-839b-9f376367a2e9.jpg',
          'https://api-ecom.duthanhduoc.com/images/40ac6bc7-c9dd-46f2-9abe-67ea984f1bf6.jpg',
          'https://api-ecom.duthanhduoc.com/images/f6bdd55e-954e-411e-b084-5addcb3bda16.jpg',
          'https://api-ecom.duthanhduoc.com/images/242b0379-269e-4f4f-a2da-3b1a3b6d52b8.jpg',
          'https://api-ecom.duthanhduoc.com/images/f56a0dfa-81de-49e5-b997-92c35627358d.jpg'
        ],
        price: 37000,
        rating: 4.95,
        price_before_discount: 70000,
        quantity: 724,
        sold: 75,
        view: 548,
        name: 'Áo Cotton Nam Đông Xuân Cộc Tay Và Ba Lỗ ( Video+ Ảnh Thật )',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/a1c873c9-a1e3-477e-8a09-e9bd6e43b1cf.jpg',
        createdAt: '2021-05-25T14:08:35.273Z',
        updatedAt: '2023-06-20T01:30:13.912Z'
      },
      {
        _id: '60ad04392fb52902585972ac',
        images: [
          'https://api-ecom.duthanhduoc.com/images/ef8fcfa8-c006-486e-9660-462efa93ad43.jpg',
          'https://api-ecom.duthanhduoc.com/images/5d172cad-1bcf-4d9d-99d1-0181e3aafdae.jpg',
          'https://api-ecom.duthanhduoc.com/images/f6ad0955-51bd-444b-bd74-b5bb4166ccfb.jpg',
          'https://api-ecom.duthanhduoc.com/images/9064e6d7-1315-4109-bbfa-6003f3a7227b.jpg',
          'https://api-ecom.duthanhduoc.com/images/789df15f-0298-4083-a559-7f567abb9adc.jpg',
          'https://api-ecom.duthanhduoc.com/images/1204c73a-151c-4b31-9e4e-bcee60db0b68.jpg'
        ],
        price: 79000,
        rating: 4.8,
        price_before_discount: 150000,
        quantity: 23210,
        sold: 898,
        view: 1510,
        name: '[XẢ KHO GIÁ SỐC] Áo thun nam cổ tim ngắn tay đẹp nhiều màu đủ size ( có size lớn cho người 100 kg )',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/ef8fcfa8-c006-486e-9660-462efa93ad43.jpg',
        createdAt: '2021-05-25T14:05:45.785Z',
        updatedAt: '2023-06-20T01:30:13.936Z'
      },
      {
        _id: '60ad03872fb52902585972ab',
        images: [
          'https://api-ecom.duthanhduoc.com/images/d2fe4691-1d73-4bb2-8aec-afff5f13e83d.jpg',
          'https://api-ecom.duthanhduoc.com/images/09e9a588-c37f-4f8c-8e71-526740463197.jpg',
          'https://api-ecom.duthanhduoc.com/images/d0008f1d-6b5b-41c2-9f10-fbafe8d77654.jpg',
          'https://api-ecom.duthanhduoc.com/images/9fc757bd-72d0-4eb4-bb9f-1b4c24cdd0f5.jpg',
          'https://api-ecom.duthanhduoc.com/images/9ff8b241-df66-4d1d-af33-f13bebcaf533.jpg',
          'https://api-ecom.duthanhduoc.com/images/c7f0f858-537e-49f6-9d91-2f29bb97ac2b.jpg',
          'https://api-ecom.duthanhduoc.com/images/59f5a601-5dde-41dc-93ac-aee91e33c4ae.jpg',
          'https://api-ecom.duthanhduoc.com/images/886dd1a2-30db-4734-99d8-9d7c678426b7.jpg',
          'https://api-ecom.duthanhduoc.com/images/96190778-61d9-4d53-a449-6a7ec4a33b8d.jpg'
        ],
        price: 982350,
        rating: 4.9,
        price_before_discount: 189000,
        quantity: 3224,
        sold: 523,
        view: 1130,
        name: 'Áo thun nam nữ cotton co giãn unisex Giisel phông trơn basic tee tay lỡ oversize form rộng 10 màu',
        category: {
          _id: '60aba4e24efcc70f8892e1c6',
          name: 'Áo thun',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/d2fe4691-1d73-4bb2-8aec-afff5f13e83d.jpg',
        createdAt: '2021-05-25T14:02:47.426Z',
        updatedAt: '2023-06-20T01:30:13.866Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 20,
      page_size: 3
    }
  }
};
const productDetailRes = {
  message: 'Lấy sản phẩm thành công',
  data: {
    _id: '60afb2c76ef5b902180aacba',
    images: [
      'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
      'https://api-ecom.duthanhduoc.com/images/6c4f6bde-6242-40fd-be52-d06033636e04.jpg',
      'https://api-ecom.duthanhduoc.com/images/1385ed69-6843-4edb-a1fb-e5fc795a99e5.jpg',
      'https://api-ecom.duthanhduoc.com/images/7f4f7a5b-b003-462a-a6b9-c0e69175def3.jpg',
      'https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg',
      'https://api-ecom.duthanhduoc.com/images/5054f46f-d317-40f6-a804-6b22dc92e946.jpg',
      'https://api-ecom.duthanhduoc.com/images/eed30991-df2d-41b5-afb2-697a06ba3299.jpg',
      'https://api-ecom.duthanhduoc.com/images/2922fee1-448c-4302-bcc2-804e0fe44f84.jpg',
      'https://api-ecom.duthanhduoc.com/images/84f7bf91-685c-4be9-bd8c-1f0a4e2e21c3.jpg'
    ],
    price: 3190000,
    rating: 4.6,
    price_before_discount: 3990000,
    quantity: 138,
    sold: 1200,
    view: 47328,
    name: 'Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng',
    description:
      '<p>Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />Bộ sản phẩm bao gồm: Th&acirc;n m&aacute;y, sạc, c&aacute;p USB, tai nghe, ốp lưng, dụng cụ lấy sim, s&aacute;ch hướng dẫn sử dụng.</p><p>Chất sang chảnh, chuẩn m&agrave;n h&igrave;nh<br />M&agrave;n h&igrave;nh sống động 6.39 AMOLED tr&agrave;n viền<br />Camera Selfie trượt 16MP ấn tượng, đầy m&ecirc; hoặc<br />Bộ 3 Camera AI 48MP si&ecirc;u chụp b&oacute;ng đ&ecirc;m<br />Thiết kế mặt lưng tr&agrave;n &aacute;nh s&aacute;ng<br />Nổi bật trong đ&ecirc;m sắc m&agrave;u. Lấy cảm hứng từ sắc đ&ecirc;m huyền ảo, được chế t&aacute;c tinh xảo tạo n&ecirc;n mặt lưng 3D chuyển m&agrave;u khi tương t&aacute;c với &aacute;nh s&aacute;ng. Với 4 m&agrave;u sắc Xanh Sapphire, Xanh Lục Bảo, T&iacute;m Ngọc v&agrave; Đen Thạch Anh, sẽ khiến bạn trở bạn trở th&agrave;nh t&acirc;m điểm của sự ch&uacute; &yacute;<br />Thật ấn tượng với camera selfie sẽ tự động bật l&ecirc;n v&agrave; thu lại theo thao t&aacute;c chụp ảnh selfie c&ugrave;ng thuật to&aacute;n l&agrave;m đẹp AI Beauty, ảnh selfie cực k&igrave; th&uacute; vị<br />K&iacute;ch thước 66.25 x 75.62 x 8.83 (mm)<br />Trọng lượng 183 g<br />Camera trước 16MP f/2.2 Popup <br />Camera sau 48MP f/1.7 - Camera chụp đ&ecirc;m<br /> 8MP f/2.2 - Camera g&oacute;c rộng<br /> 2MP f/2.4 - Camera x&oacute;a ph&ocirc;ng <br />Độ ph&acirc;n giải FHD+ ( 1080 x 2340 )<br />Cổng USB USB Type-C<br />Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng</p><p>Cảm ơn qu&yacute; kh&aacute;ch đ&atilde; quan t&acirc;m đến sản phẩm b&ecirc;n shop, qu&yacute; kh&aacute;ch vui l&ograve;ng d&agrave;nh &iacute;t thời gian đọc kĩ ch&iacute;nh s&aacute;ch bảo h&agrave;nh đổi trả:<br />- Sản phẩm được bao test 7 ng&agrave;y kể từ ng&agrave;y nhận được sản phẩm v&agrave; sẽ được đổi m&aacute;y mới c&ugrave;ng model hoặc gi&aacute; trị tương đương sau khi được thẩm định lỗi kĩ thuật.<br />- Sản phẩm lỗi kĩ thuật được x&aacute;c nhận bởi trung t&acirc;m bảo h&agrave;nh ủy quyền ch&iacute;nh h&atilde;ng (bằng văn bản); kh&aacute;ch h&agrave;ng c&oacute; thể gửi lại shop để x&aacute;c nhận lỗi hoặc tới trạm bảo h&agrave;nh gần nhất để thẩm định lỗi.<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hiện trạng m&aacute;y kh&ocirc;ng trầy xước, kh&ocirc;ng bể vỡ, v&ocirc; nước, g&atilde;y ch&acirc;n sim, khung thẻ nhớ&hellip; (tất cả c&aacute;c t&aacute;c động ngoại lực từ ph&iacute;a kh&aacute;ch h&agrave;ng đều TỪ CHỐI BẢO H&Agrave;NH)<br />- Sản phẩm đổi trả phải c&ograve;n nguy&ecirc;n hộp tr&ugrave;ng imei, phụ kiện k&egrave;m theo m&aacute;y kh&ocirc;ng trầy xước, ch&aacute;y nổ, đứt d&acirc;y (nếu trầy xước shop kh&ocirc;ng đổi phụ kiện mới)<br />- Sau 7 ng&agrave;y bao test, sản phẩm vẫn nhận ch&iacute;nh s&aacute;ch bảo h&agrave;nh 18 th&aacute;ng kể từ ng&agrave;y k&iacute;ch hoạt bảo h&agrave;nh (kh&aacute;ch chịu ph&iacute; vận chuyển tới shop bảo h&agrave;nh hộ hoặc tự đến trung t&acirc;m bảo h&agrave;nh gần nhất để được hỗ trợ)<br />- Trong một số trường hợp sản phẩm đ&atilde; được k&iacute;ch hoạt bảo h&agrave;nh điện tử để tham gia chương tr&igrave;nh khuyến m&atilde;i c&oacute; gi&aacute; tốt cho kh&aacute;ch h&agrave;ng. Vui l&ograve;ng chat với nh&acirc;n vi&ecirc;n tư vấn để được hỗ trợ th&ecirc;m th&ocirc;ng tin.<br />- Sản phẩm bị TỪ CHỐI BẢO H&Agrave;NH khi ch&aacute;y nổ, bể vỡ, t&aacute;c động ngoại lực v&agrave;o th&acirc;n v&agrave; b&ecirc;n trong m&aacute;y, c&oacute; thay đổi sửa chữa b&ecirc;n ngo&agrave;i.<br />- C&aacute;c sản phẩm bị kh&oacute;a t&agrave;i khoản như Gmail, Samsung account&hellip; Kh&aacute;ch tự chịu ph&iacute; mở kh&oacute;a nếu kh&ocirc;ng nhớ mật khẩu.<br />Điện Thoại Vsmart Active 3 6GB/64GB - H&agrave;ng Ch&iacute;nh H&atilde;ng<br />#điện_thoại #dienthoai #di_động #didong #điện_thoại_di_động #dien_thoai_di_dong #điện_thoại_ch&iacute;nh_h&atilde;ng #h&agrave;ng_ch&iacute;nh_h&atilde;ng #điện_thoại_gi&aacute;_rẻ #dien_thoai_gia_re #gi&aacute; rẻ #khuyen_mai #freeship #mobile #smartphone #điện_thoại_vsmart #vsmart #vsmart_ active_3</p>',
    category: {
      _id: '60afafe76ef5b902180aacb5',
      name: 'Điện thoại',
      __v: 0
    },
    image: 'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
    createdAt: '2021-05-27T14:55:03.113Z',
    updatedAt: '2023-06-20T06:43:08.970Z'
  }
};

const productRequest = rest.get(`${config.baseUrl}/products`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(productResponse));
});

const productDetailRequest = rest.get(`${config.baseUrl}/products/:id`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(productDetailRes));
});

const productRequests = [productRequest, productDetailRequest];
export default productRequests;
