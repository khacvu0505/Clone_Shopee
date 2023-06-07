import React from 'react';
import AsideFilter from './components/AsideFilter';
import SortProductList from './components/SortProductList';
import Product from './components/Product/Product';
import { useQuery } from '@tanstack/react-query';
import { getProductList } from 'src/api/product.api';
import Paginatiton from 'src/components/Paginatiton';
import { ProductListConfig } from 'src/types/product.type';
import useQueryConfig from 'src/hooks/useQueryConfig';
import Loading from 'src/components/Loading';

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

export default function ProductList() {
  const queryConfig = useQueryConfig();

  const { data: productList, isLoading } = useQuery({
    queryKey: ['productList', queryConfig],
    queryFn: () => getProductList(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  });

  if (isLoading) return <Loading />;

  return (
    <div className='min-w-[1100px] bg-gray-200 py-6'>
      <title>Trang chủ |Shopee Clone</title>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList queryConfig={queryConfig} pageSize={Number(productList?.data.data.pagination.page_size)} />

            <div className='mt-6 grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-4'>
              {productList &&
                productList.data.data.products.map((product) => <Product key={product._id} product={product} />)}
            </div>
            <Paginatiton queryConfig={queryConfig} pageSize={Number(productList?.data.data.pagination.page_size)} />
          </div>
        </div>
      </div>
    </div>
  );
}
