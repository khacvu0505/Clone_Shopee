import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/contexts/app.context';
import userImg from 'src/images/userImg.jpg';
import { getUrlAvatar } from 'src/utils/utils';

export default function UserSideNav() {
  const { profile } = useContext(AppContext);
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={profile?.avatar ? getUrlAvatar(profile?.avatar) : userImg}
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            `flex items-center capitalize  transition-colors ${isActive ? 'text-orange' : 'text-black'}`
          }
        >
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            `mt-4 flex items-center capitalize  transition-colors ${isActive ? 'text-orange' : 'text-black'}`
          }
        >
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            `mt-4 flex items-center capitalize  transition-colors ${isActive ? 'text-orange' : 'text-black'}`
          }
        >
          Đơn mua
        </NavLink>
      </div>
    </div>
  );
}
