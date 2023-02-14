import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constant/path'
import { QueryConfig } from 'src/page/ProductList/ProductList'
import { ProductListConfig } from 'src/types/product.type'

interface PaginationProps {
  pageSize: number
  queryConfig: QueryConfig
}

export default function Paginatiton(props: PaginationProps) {
  const { queryConfig, pageSize = 1 } = props
  const page = Number(queryConfig.page)

  const rangePage = 2

  const renderDots = () => <span className='mx-2 rounded bg-white px-2  py-3 shadow-sm '>...</span>

  const renderPagination = () => {
    return (
      pageSize > 0 &&
      [...Array(pageSize)].map((_, index) => {
        const pageNumber = index + 1

        if (page <= rangePage * 2 + 1 && pageNumber > page + rangePage && pageNumber < pageSize - 1) {
          return renderDots()
        } else if (page > rangePage * 2 + 1 && page < pageSize - rangePage * 2) {
          if (pageNumber > rangePage && pageNumber < page - 1) {
            return renderDots()
          } else if (pageNumber > page + rangePage && pageNumber < pageSize - 1) {
            return renderDots()
          }
        } else if (page >= pageSize - rangePage * 2 && pageNumber < page - rangePage && pageNumber > rangePage) {
          return renderDots()
        }
        return (
          <Link
            // to={{
            //   pathname: path.home
            // }}
            // to={`?${{ ...queryConfig, page: pageNumber }}`}
            to={{
              pathname: path.home,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              search: `${new URLSearchParams({ ...queryConfig, page: pageNumber.toString() })}`
            }}
            key={index}
            className={`mx-2 cursor-pointer rounded bg-white px-2 py-3 shadow-sm ${
              page === pageNumber ? 'border-[2px] border-orange' : ''
            }`}
            // onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Link>
        )
      })
    )
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <div className={`mt-4 ${page <= 1 ? 'cursor-not-allowed' : ''}`}>
        <Link
          to={{
            pathname: path.home,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            search: `${new URLSearchParams({ ...queryConfig, page: page - 1 })}`
          }}
          className={`mx-2 rounded bg-white px-2  py-3 shadow-sm hover:bg-slate-100 ${
            page > 1 ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          Previos
        </Link>
      </div>

      {renderPagination()}
      <div className={`mt-4 ${page >= pageSize ? 'cursor-not-allowed' : ''}`}>
        <Link
          to={{
            pathname: path.home,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            search: `${new URLSearchParams({ ...queryConfig, page: page + 1 })}`
          }}
          className={` mx-2 rounded bg-white px-2  py-3 shadow-sm hover:bg-slate-100 ${
            page < pageSize ? 'cursor-pointer' : 'pointer-events-none'
          }`}
          // style={{ pointerEvents: 'none', cursor: 'not-allowed' }}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
