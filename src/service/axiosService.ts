import axios from 'axios'
import { ServiceError } from '@/error'
import type { ServiceResponse } from '@/service/serviceResponse.ts'

export const axiosService = () => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
  return axios.create({
    baseURL: 'http://localhost:8080/api',
  })
}

export const get = <T = any>(url: string): Promise<ServiceResponse<T>> => {
  return axiosService()
    .get(url)
    .catch(function (error) {
      throw new ServiceError(error.response.data.message)
    })
}
export const post = <T>(url: string, params: any): Promise<ServiceResponse<T>> => {
  return axiosService()
    .post(url, params)
    .catch(function (error) {
      throw new ServiceError(error.response.data.message)
    })
}
export const put = <T>(url: string, params: any): Promise<ServiceResponse<T>> => {
  return axiosService()
    .put(url, params)
    .catch(function (error) {
      throw new ServiceError(error.response.data.message)
    })
}

export const del = <T>(url: string): Promise<ServiceResponse<T>> => {
  return axiosService()
    .delete(url)
    .catch(function (error) {
      throw new ServiceError(error.response.data.message)
    })
}
