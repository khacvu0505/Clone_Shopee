import React from 'react'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constant/path'
import { PurchaseStatus } from 'src/constant/purchase'
import { logout } from 'src/api/auth.api'
import { useQueryClientHook } from 'src/hooks/useQueryClient'
import { useMutation } from '@tanstack/react-query'
import userImg from 'src/images/userImg.jpg'
import { getUrlAvatar } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

// type typeLocales = 'vn' | 'en'
export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = React.useContext(AppContext)
  const queryClient = useQueryClientHook()

  const { i18n } = useTranslation()
  const curerntLanguage = locales[i18n.language as keyof typeof locales]

  // Mutations
  const logoutMutation = useMutation({
    mutationFn: logout
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
        setProfile(null)
        queryClient.removeQueries(['purchases', PurchaseStatus.inCart])
        queryClient.removeQueries(['profile'])
      }
    })
  }

  const handleChangeLanguage = (lng: 'en' | 'vn') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='flex min-w-[1100px] justify-end text-white'>
      <Popover
        numberOffset={6}
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border-gray-200 bg-white shadow-sm'>
            <div className='flex flex-col py-2 pr-20 pl-3'>
              <button onClick={() => handleChangeLanguage('vn')} className='py-1 px-3 hover:text-orange'>
                Tiếng Việt
              </button>
              <button onClick={() => handleChangeLanguage('en')} className='mt-2 py-1 px-3 hover:text-orange'>
                Tiếng Anh
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>{curerntLanguage}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated ? (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='rounded-sm border border-gray-200 shadow-md'>
              <Link to={path.profile} className='block bg-white py-3 px-4 hover:bg-slate-100 hover:text-cyan-500'>
                Tài khoản của tôi
              </Link>
              <Link
                to={path.historyPurchase}
                className='block bg-white py-3 px-4 hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='m-5 h-5 flex-shrink-0'>
            <img
              src={profile?.avatar ? getUrlAvatar(profile?.avatar) : userImg}
              alt='avatar'
              className='h-7 w-7 rounded-full object-cover'
            />
          </div>
          <div>{profile?.email}</div>
        </Popover>
      ) : (
        <div className='ml-4 flex items-center'>
          <Link to={path.register} className='text-sm italic underline'>
            Đăng ký
          </Link>
          <Link to={path.login} className='ml-3 text-sm italic underline'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}
