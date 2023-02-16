import { SuccessResponse } from 'src/types/utils.type'
import { Category } from 'src/types/category.type'
import http from 'src/utils/http'

const CATEGORY_URL = '/categories'

export const getCategoryList = () => {
  return http.get<SuccessResponse<Category[]>>(CATEGORY_URL)
}
