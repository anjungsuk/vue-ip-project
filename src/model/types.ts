export interface Page {
  pageable: Pageable
  size: number
  sort: Sort
  totalElements: number
  totalPages: number
}

export interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface ContentKey {
  id: number
}

export interface Contents<T> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface ContentQuery {
  page: number
  size: number
  sort: string
  searchCategory?: string
  searchType?: string
  searchKeyword?: string
}

export interface Content<T> {
  content: T
}
