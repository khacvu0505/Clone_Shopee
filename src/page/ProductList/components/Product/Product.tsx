import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <Link to={`/product-detail/${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='overflow-hidden rounded-md bg-white shadow transition-all duration-150 hover:translate-y-[-1px]'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt={product.name} className='absolute left-0 top-0 h-full object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[40px] text-sm line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-50% truncate text-sm text-gray-500 line-through'>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className='ml-1 truncate text-sm text-orange'>{formatCurrency(product.price)}</div>
          </div>
        </div>
        <div className='m-3 flex items-center justify-end'>
          <ProductRating rating={product.rating} />
          <div className='mx-2 text-sm '>
            <span>{formatNumberToSocialStyle(product.sold)}</span>
            <span className='ml-1'>Đã bán</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
