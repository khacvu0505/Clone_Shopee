import React, { useMemo } from 'react'
import { QueryConfig } from '../ProductList'
import { SortBy, Order } from 'src/constant/product'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constant/path'

interface SortProductListProps {
  pageSize: number
  queryConfig: QueryConfig
}

export default function SortProductList(props: SortProductListProps) {
  const { queryConfig, pageSize = 1 } = props
  const { sort_by = SortBy.createdAt, order = Order.desc } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: SortBy) => {
    return sort_by === sortByValue
  }

  const listBtn = useMemo(() => {
    return [
      {
        key: 'Phổ biến',
        value: SortBy.view
      },
      {
        key: 'Mới nhất',
        value: SortBy.createdAt
      },
      {
        key: 'Bán chạy',
        value: SortBy.sold
      }
    ]
  }, [])

  const handleNavigate = (redirect: SortBy) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: redirect
      }).toString()
    })
  }

  const renderBtnSort = () => {
    return listBtn.map((item, index) => (
      <button
        key={index}
        className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
          isActiveSortBy(item.value)
            ? 'bg-orange text-white hover:bg-orange/80 '
            : 'bg-white text-black hover:bg-slate-200'
        }`}
        onClick={() => handleNavigate(item.value)}
      >
        {item.key}
      </button>
    ))
  }

  // const handleSort = () => {

  // }

  return (
    <div className='bg-gray-300/40 py-4 px-2'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-sm'>Sắp xếp theo</div>
          {/* <button
            className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
              isActiveSortBy(SortBy.view)
                ? 'bg-orange text-white hover:bg-orange/80 '
                : 'bg-white text-black hover:bg-slate-200'
            }`}
            onClick={() => handleNavigate(SortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
              isActiveSortBy(SortBy.createdAt)
                ? 'bg-orange text-white hover:bg-orange/80 '
                : 'bg-white text-black hover:bg-slate-200'
            }`}
            onClick={() => handleNavigate(SortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
              isActiveSortBy(SortBy.sold)
                ? 'bg-orange text-white hover:bg-orange/80 '
                : 'bg-white text-black hover:bg-slate-200'
            }`}
            onClick={() => handleNavigate(SortBy.sold)}
          >
            Bán chạy
          </button> */}
          {renderBtnSort()}
          <select
            className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
              isActiveSortBy(SortBy.price)
                ? 'bg-orange text-white hover:bg-orange/80 '
                : 'bg-white text-black hover:bg-slate-200'
            }`}
            value={order || ''}
          >
            <option selected disabled value=''>
              Giá
            </option>
            <option value={Order.asc}>Giá từ thấp đến cao</option>
            <option value={Order.desc}>Giá từ cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60  px-2 shadow-sm hover:bg-slate-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-tl-sm rounded-bl-sm bg-white/60  px-2 shadow-sm hover:bg-slate-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
