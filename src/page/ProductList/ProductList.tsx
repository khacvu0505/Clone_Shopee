import React from 'react'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import { getProductList } from 'src/api/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Paginatiton from 'src/components/Paginatiton'
import { ProductListConfig } from 'src/types/product.type'
import { omitBy, isUndefined } from 'lodash'

// rangePage = 2
// [1] 2 3 ... 19 20
// 1 [2] 3 4 ... 19 20
// 1 2 [3] 4 5 ... 19 20
// 1 2 3 [4] 5 6...19 20
// 1 2 3 4 [5] 6 7 ... 19 20

// 1 2 ... 4 5 [6] 7 8  ... 19 20
// 1 2 ... 5 6 [7] 8 9  ... 19 20
// 1 2 ... 6 7 [8] 9 10 ... 19 20
// 1 2 ... 11 12 [13] 14 15 ... 19 20
// 1 2 ... 12 13 [14] 15 16 ... 19 20
// 1 2 ... 13 14 [15] 16 17 ... 19 20

// 1 2 ... 14 15 [16] 17 18 19 20
// 1 2 ... 15 16 [17] 18 19 20
// 1 2 ... 16 17 [18] 19 20

// ======= rangePage = 3
// [1] 2 3 4 ... 18 19 20
// 1 [2] 3 4 5 ... 18 19 20
// 1 2 [3] 4 5 6 ... 18 19 20
// 1 2 3 [4] 5 6 7 ... 18 19 20
// 1 2 3 4 [5] 6 7 8 ... 18 19 20
// 1 2 3 4  ...  [6] 7 8 9 ... 18 19 20

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      category: queryParams.category,
      exclude: queryParams.exclude,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['productList', queryParams],
    queryFn: () => getProductList(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList queryConfig={queryConfig} pageSize={Number(data?.data.pagination.page_size)} />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
              {data && data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
            {/* pageSize={data?.data.pagination.page_size || 1} */}
            <Paginatiton queryConfig={queryConfig} pageSize={Number(data?.data.pagination.page_size)} />
          </div>
        </div>
      </div>
    </div>
  )
}