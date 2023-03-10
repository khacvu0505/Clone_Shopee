import React, { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { buyProduct, deletePurchase, getPurchaseList, updatePurchase } from 'src/api/purchase.api'
import { PurchaseStatus } from 'src/constant/purchase'
import { Link, useLocation } from 'react-router-dom'
import { generateNameId, formatCurrency } from 'src/utils/utils'
import QuantityController from 'src/components/QuantityController'
import Button from 'src/components/Button'
import { ExtendedPurchases, ProductAddToPurchase } from 'src/types/purchase.type'
import produce from 'immer'
import { useQueryClientHook } from 'src/hooks/useQueryClient'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { state } = useLocation()
  const purchaseId = (state as { purchaseId: string | null })?.purchaseId

  const queryClient = useQueryClientHook()

  const { data: purchaseInCardData } = useQuery({
    queryKey: ['purchases', PurchaseStatus.inCart],
    queryFn: () => getPurchaseList(PurchaseStatus.inCart)
  })

  const purchaseInCard = useMemo(() => {
    return purchaseInCardData?.data.data ?? []
  }, [purchaseInCardData])

  const updatePurchasesMutation = useMutation({
    mutationKey: ['updatePurchases'],
    mutationFn: (body: ProductAddToPurchase) => updatePurchase(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', PurchaseStatus.inCart] })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: (body: string[]) => deletePurchase(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', PurchaseStatus.inCart] })
    }
  })

  const buyPurchasesMutation = useMutation({
    mutationFn: (body: ProductAddToPurchase[]) => buyProduct(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', PurchaseStatus.inCart] })
      toast.success('Mua s???n ph???m th??nh c??ng', {
        autoClose: 1500
      })
    }
  })

  const isCheckedAll = extendedPurchases.length > 0 ? extendedPurchases.every((item) => item.checked) : false

  const listProductChoose = useMemo(() => {
    return extendedPurchases.reduce((accumulator: string[], currentValue: ExtendedPurchases) => {
      if (currentValue.checked) {
        accumulator.push(currentValue._id)
      }
      return accumulator
    }, [])
  }, [extendedPurchases])

  const totalCheckedPurchasePrice = useMemo(() => {
    return extendedPurchases.reduce((accumulator: number, currentValue: ExtendedPurchases) => {
      if (currentValue.checked) {
        accumulator += currentValue.buy_count * currentValue.price
      }
      return accumulator
    }, 0)
  }, [extendedPurchases])

  const totalCheckedPurchasePriceBeforeDiscount = useMemo(() => {
    return extendedPurchases.reduce((accumulator: number, currentValue: ExtendedPurchases) => {
      if (currentValue.checked) {
        accumulator += currentValue.buy_count * currentValue.price_before_discount
      }
      return accumulator
    }, 0)
  }, [extendedPurchases])

  useEffect(() => {
    if (purchaseInCard.length > 0) {
      const value = purchaseInCard?.map((item, index) => {
        const isHavePurchaseId = purchaseId === item._id
        return {
          ...item,
          checked: isHavePurchaseId
            ? item._id === purchaseId
            : purchaseInCard.length === extendedPurchases.length
            ? extendedPurchases[index]?.checked || false
            : false
        }
      })
      setExtendedPurchases(value)
    } else {
      setExtendedPurchases([])
    }
  }, [purchaseInCard, purchaseId])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases(extendedPurchases.map((item) => ({ ...item, checked: !isCheckedAll })))
  }

  const handleQuantity = (purchaseIndex: number, value: number, isDisabled: boolean) => {
    if (isDisabled) {
      return
    }
    const purchase = extendedPurchases[purchaseIndex]
    updatePurchasesMutation.mutate({ product_id: purchase.product._id, buy_count: value })
  }

  const handleChangeInputQuantity = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].buy_count = Number(event.target.value || 1)
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteMulti = () => {
    const purchaseIds = listProductChoose
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    const listProduct = extendedPurchases.reduce((acc: ProductAddToPurchase[], current: ExtendedPurchases) => {
      if (current.checked) {
        acc.push({
          product_id: current.product._id,
          buy_count: current.buy_count
        })
      }
      return acc
    }, [])
    listProduct.length > 0 && buyPurchasesMutation.mutate(listProduct)
  }

  return (
    <div className='bg-neutral-100 py-16'>
      {extendedPurchases.length > 0 ? (
        <>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange'
                        checked={isCheckedAll}
                        onChange={handleCheckAll}
                      />
                    </div>
                    <div className='flex-grow text-black'>S???n ph???m</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>????n gi??</div>
                    <div className='col-span-1'>S??? l?????ng</div>
                    <div className='col-span-1'>S??? ti???n</div>
                    <div className='col-span-1'>Thao t??c</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchases?.map((item, index: number) => (
                  <div
                    key={item._id}
                    className='mt-3 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={item.checked}
                            onChange={handleCheck(index)}
                          />
                        </div>
                        <div className='flex-grow items-center'>
                          <div className='flex items-center'>
                            <Link
                              to={`/product-detail/${generateNameId({
                                name: item.product.name,
                                id: item.product._id
                              })}`}
                              className='h-20 w-20 flex-shrink-0'
                            >
                              <img alt={item.product.name} src={item.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2 text-left'>
                              <Link
                                to={`/product-detail/${generateNameId({
                                  name: item.product.name,
                                  id: item.product._id
                                })}`}
                                className='line-clamp-2'
                              >
                                {item.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              {formatCurrency(item.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>{formatCurrency(item.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={item.product.quantity}
                            value={item.buy_count}
                            onIncrease={() =>
                              handleQuantity(index, item.buy_count + 1, item.buy_count >= item.product.quantity)
                            }
                            onDecrease={() => handleQuantity(index, item.buy_count - 1, item.buy_count <= 1)}
                            onType={handleChangeInputQuantity(index)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                item.buy_count <= 1 ||
                                  item.buy_count >= item.product.quantity ||
                                  value === purchaseInCard[index].buy_count
                              )
                            }
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>{formatCurrency(item.product.price * item.buy_count)}</span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='bg-none text-black transition-colors  hover:text-orange'
                            onClick={handleDelete(index)}
                          >
                            X??a
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 flex flex-col rounded-sm bg-white p-5 sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange'
                  checked={isCheckedAll}
                  onChange={handleCheckAll}
                />
              </div>
              <button className='mx-3 border-none bg-none' onChange={handleCheckAll}>
                Ch???n t???t c??? ({listProductChoose.length})
              </button>
              <button className='mx-3 border-none bg-none' onClick={handleDeleteMulti}>
                X??a
              </button>
            </div>

            <div className='mt-5 sm:ml-auto sm:mt-0'>
              <div className='flex items-center'>
                <div>T???ng thanh to??n ({listProductChoose.length} s???n ph???m)</div>
                <div className='ml-2 text-2xl text-orange'>{formatCurrency(totalCheckedPurchasePrice)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Ti???t ki???m</div>
                <div className='ml-6 text-orange'>
                  {formatCurrency(totalCheckedPurchasePriceBeforeDiscount - totalCheckedPurchasePrice)}
                </div>
              </div>
            </div>
            <Button
              onClick={handleBuyPurchase}
              className='mt-3 ml-0 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              isLoading={buyPurchasesMutation.isLoading}
            >
              Mua h??ng
            </Button>
          </div>
        </>
      ) : (
        <div className='2 container rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
          Hi???n ch??a c?? s???n ph???m trong gi??? h??ng
        </div>
      )}
    </div>
  )
}
