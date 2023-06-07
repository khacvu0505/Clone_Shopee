import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { Link, createSearchParams } from 'react-router-dom';
import { getPurchaseList } from 'src/api/purchase.api';
import { path } from 'src/constant/path';
import { PurchaseStatus } from 'src/constant/purchase';
import useQueryParams from 'src/hooks/useQueryParams';
import { PurchaseListStatus } from 'src/types/purchase.type';
import { formatCurrency, generateNameId } from 'src/utils/utils';

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams();
  const status = (Number(queryParams.status) || PurchaseStatus.all) as PurchaseListStatus;

  const purchaseTabs = useMemo(() => {
    return [
      { status: PurchaseStatus.all, name: 'Tất cả' },
      { status: PurchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
      { status: PurchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
      { status: PurchaseStatus.inProgress, name: 'Đang giao' },
      { status: PurchaseStatus.delivered, name: 'Đã giao' },
      { status: PurchaseStatus.canceled, name: 'Đã hủy' }
    ];
  }, []);

  const { data: purchaseInCardData } = useQuery({
    queryKey: ['purchases', status],
    queryFn: () => getPurchaseList(status)
  });

  const purchaseInCart = purchaseInCardData?.data.data;

  return (
    <div>
      <div className='overflow-x-auto sm:overflow-x-visible'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {purchaseTabs.map((item, index) => (
              <Link
                key={index}
                to={{
                  pathname: path.historyPurchase,
                  search: createSearchParams({
                    status: item.status.toString()
                  }).toString()
                }}
                className={`flex flex-1 items-center justify-center bg-white py-4 ${
                  status === item.status ? 'border-b-orange text-orange' : 'border-b-black/10 text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            {purchaseInCart?.map((item) => (
              <div key={item._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`/product-detail/${generateNameId({ name: item.product.name, id: item.product._id })}`}
                  className='flex items-center'
                >
                  <div className='flex shrink-0'>
                    <img className='h-20 w-20 object-cover' src={item.product.image} alt='img_product' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'> {item.product.name}</div>
                    <div className='mt-3'>x {item.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      {formatCurrency(item.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>{formatCurrency(item.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end '>
                  <div>
                    <span>Tổng giá tiền </span>
                    <span className='text-orange'>{formatCurrency(item.product.price * item.buy_count)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
