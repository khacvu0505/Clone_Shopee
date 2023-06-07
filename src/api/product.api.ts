import { Product, ProductList, ProductListConfig } from 'src/types/product.type';
import { SuccessResponse } from 'src/types/utils.type';
import http from 'src/utils/http';

const PRODUCT_URL = '/products';

export const getProductList = (params?: ProductListConfig) => {
  return http.get<SuccessResponse<ProductList>>(PRODUCT_URL, { params });
};

export const getProductDetail = (id: string) => {
  return http.get<SuccessResponse<Product>>(`${PRODUCT_URL}/${id}`);
};
