import { ProductAddToPurchase, Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const PURCHASE_URL = '/purchases'

export const addToCart = (data: ProductAddToPurchase) => {
  return http.post<SuccessResponse<Purchase>>(`${PURCHASE_URL}/add-to-cart`, data)
}

export const getPurchaseList = (status: PurchaseListStatus) => {
  return http.get<SuccessResponse<Purchase[]>>(PURCHASE_URL, { params: { status } })
}

export const buyProduct = (data: ProductAddToPurchase[]) => {
  return http.post<SuccessResponse<Purchase[]>>(`${PURCHASE_URL}/buy-products`, data)
}

export const updatePurchase = (data: ProductAddToPurchase) => {
  return http.put<SuccessResponse<Purchase>>(`${PURCHASE_URL}/update-purchase`, data)
}

export const deletePurchase = (purchaseIds: string[]) => {
  return http.delete<SuccessResponse<{ deleted_count: string }>>(PURCHASE_URL, {
    data: purchaseIds
  })
}
