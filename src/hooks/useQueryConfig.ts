import useQueryParams from './useQueryParams';
// import { QueryConfig } from 'src/page/ProductList/ProductList'
import { isUndefined, omitBy } from 'lodash';
import { ProductListConfig } from 'src/types/product.type';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};
export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
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
  );
  return queryConfig;
}
