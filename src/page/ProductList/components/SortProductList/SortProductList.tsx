import React, { useMemo } from 'react';

import { SortBy, Order } from 'src/constant/product';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constant/path';
import { omit } from 'lodash';
import { QueryConfig } from 'src/hooks/useQueryConfig';

interface SortProductListProps {
  pageSize: number;
  queryConfig: QueryConfig;
}

export default function SortProductList(props: SortProductListProps) {
  const { queryConfig, pageSize } = props;
  const page = Number(queryConfig.page) || 1;
  const { sort_by = SortBy.createdAt, order = Order.desc } = queryConfig;
  const navigate = useNavigate();

  const isActiveSortBy = (sortByValue: SortBy) => {
    return sort_by === sortByValue;
  };

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
    ];
  }, []);

  const handleSort = (redirect: SortBy) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: redirect
          },
          'order'
        )
      ).toString()
    });
  };

  const renderBtnSort = () => {
    return listBtn.map((item, index) => (
      <button
        key={index}
        className={`h-8 rounded-sm px-4 text-center text-sm capitalize ${
          isActiveSortBy(item.value)
            ? 'bg-orange text-white hover:bg-orange/80 '
            : 'bg-white text-black hover:bg-slate-200'
        }`}
        onClick={() => handleSort(item.value)}
      >
        {item.key}
      </button>
    ));
  };

  const handlePriceOrder = (orderValue: Order) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: SortBy.price,
        order: orderValue
      }).toString()
    });
  };

  return (
    <div className='bg-gray-300/40 py-4 px-2'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-sm'>Sắp xếp theo</div>
          {renderBtnSort()}
          <select
            className={`h-8 rounded-sm border-none px-4 text-center text-sm capitalize outline-none ${
              isActiveSortBy(SortBy.price)
                ? 'bg-orange text-white hover:bg-orange/80 '
                : 'bg-white text-black hover:bg-slate-200'
            }`}
            value={''}
            onChange={(event) => handlePriceOrder(event.target.value as Order)}
          >
            <option disabled value='' className='bg-slate-300 text-black'>
              Lọc theo giá
            </option>
            <option value={Order.asc} className='bg-white text-black'>
              Giá từ thấp đến cao
            </option>
            <option value={Order.desc} className='bg-white text-black'>
              Giá từ cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize || 1}</span>
          </div>
          <div className='ml-2 flex items-center'>
            <div className={`${page <= 1 ? 'cursor-not-allowed hover:bg-white/60' : 'cursor-pointer'} bg-white  p-2`}>
              <Link
                to={{
                  pathname: path.home,
                  search: `${new URLSearchParams({ ...queryConfig, page: String(page - 1) })}`
                }}
                className={`bg-white/60shadow-sm h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm hover:bg-slate-300 ${
                  page > 1 ? 'cursor-pointer' : 'pointer-events-none'
                }`}
              >
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
              </Link>
            </div>
            <div
              className={`${
                page >= pageSize ? 'cursor-not-allowed hover:bg-white/60' : 'cursor-pointer'
              } bg-white  p-2`}
            >
              <Link
                to={{
                  pathname: path.home,
                  search: `${new URLSearchParams({ ...queryConfig, page: String(page + 1) })}`
                }}
                className={`bg-white/60shadow-sm h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm hover:bg-slate-300 ${
                  page < pageSize ? 'cursor-pointer' : 'pointer-events-none'
                }`}
              >
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
