import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { path } from 'src/constant/path'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'

const priceSchema = schema.pick(['price_min', 'price_max'])
interface AsideFilterProps {
  dataCategory?: Category[] | []
  queryConfig: QueryConfig
}

// interface FormData {
//   price_min: string
//   price_max: string
// }
type FormData = Pick<Schema, 'price_min' | 'price_max'>

export default function AsideFilter(props: AsideFilterProps) {
  const { dataCategory = [], queryConfig } = props
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const navigate = useNavigate()
  const categoryId = queryConfig.category
  const isActiveCategory = (id: string) => categoryId === id

  const onSubmit = (data: FormData) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min || '',
        price_max: data.price_max || ''
      }).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !categoryId
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4'>
        <ul>
          {dataCategory.map((item) => (
            <li className='py-2 pl-2' key={item._id}>
              <Link
                to={{
                  pathname: path.home,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  search: `${new URLSearchParams({ ...queryConfig, category: item._id })}`
                }}
                className={`relative px-2  ${isActiveCategory(item._id) ? 'font-semibold text-orange' : ''}`}
              >
                {isActiveCategory(item._id) && (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}

                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link to={path.home} className='mt-4 flex items-center font-bold'>
          <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='mr-3 w-3 stroke-current'>
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-5'>
          <div>Khoảng giá</div>
          <form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    name='from'
                    className='w-full grow  p-1 text-sm outline-none focus:shadow-md'
                    placeholder='Từ'
                    onChange={(event) => field.onChange(event)}
                    value={field.value}
                    ref={field.ref}
                  />
                )}
              />

              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => (
                  <InputNumber
                    type='text'
                    name='from'
                    className='w-full grow  p-1 text-sm outline-none focus:shadow-md'
                    placeholder='Đến'
                    onChange={(event) => field.onChange(event)}
                    value={field.value}
                    ref={field.ref}
                  />
                )}
              />
            </div>
            {!isEmpty(errors) && <div className='ml-1 text-center text-sm italic text-red-500'>Giá không phù hợp</div>}
            <Button className='mt-2 w-full rounded-sm bg-orange py-2 text-sm text-white outline-none hover:bg-opacity-80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='text-sm'>Đánh giá</div>
        <div className='my-3'>
          <li className='list-none py-1 pl-2'>
            <Link to='' className='mr-2 flex items-center'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  // <div key={index}>
                  <svg key={index} viewBox='0 0 9.5 8' className='w-5'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  // </div>
                ))}
              <span className='ml-2 text-sm'>Trở lên</span>
            </Link>
          </li>
        </div>
        <div className='my-4 h-[1px] bg-gray-300' />
        <Button className='w-full rounded-sm bg-orange py-2 text-sm text-white hover:bg-opacity-80'>Xóa tất cả</Button>
      </div>
    </div>
  )
}
