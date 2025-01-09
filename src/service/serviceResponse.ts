export interface ServiceResponse<T> {
  data: T
  status: number
  statusText: string
}

export type ServiceFunction<T, R> = (params: T) => Promise<ServiceResponse<R>>
