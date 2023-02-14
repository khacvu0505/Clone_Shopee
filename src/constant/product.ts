// export const sortBy = {
//   createAt= 'createAt',
//   view: 'view',
//   sold: 'sold',
//   price: 'price'
// } as const

// export const order = {
//   asc: 'asc',
//   desc: 'desc'
// } as const

// ============= OPTION 2
export enum SortBy {
  createdAt = 'createdAt',
  view = 'view',
  sold = 'sold',
  price = 'price'
}

export enum Order {
  asc = 'asc',
  desc = 'desc'
}
