import React from 'react';
import UserSideNav from '../../components/UserSideNav';
interface UserLayoutProps {
  children?: React.ReactNode;
}
export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className='min-w-[1100px] bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-12'>
          <div className='col-span-3'>
            <UserSideNav />
          </div>
          <div className='col-span-9'>{children}</div>
        </div>
      </div>
    </div>
  );
}
