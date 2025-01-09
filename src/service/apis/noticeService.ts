import * as http from '../axiosService'
import type { Board, BoardCreate, BoardDetailQuery, BoardQuery } from '@/model/boardModel.ts'
import type { ServiceFunction } from '@/service/serviceResponse.ts'
import type { Content, ContentKey, Contents } from '@/model/types.ts'

const SERVICE: string = 'board'
const VERSION: string = 'v1'

const SERVICE_URL: string = `${SERVICE}/${VERSION}`

export const getNoticeLists: ServiceFunction<BoardQuery, Contents<Board>> = async (
  params: BoardQuery,
) => {
  return http.get(
    `${SERVICE_URL}/list?${params.searchCategory ? 'searchCategory=' + params.searchCategory : ''}${params.searchType ? '&searchType=' + params.searchType : ''}${params.searchKeyword ? '&searchKeyword=' + params.searchKeyword : ''}${params.page ? '&page=' + params.page : ''}${params.size ? '&size=' + params.size : ''}${params.size ? '&sort=' + params.sort : ''}`,
  )
}
export const getNoticeDetail: ServiceFunction<BoardDetailQuery, Content<Board>> = async (
  params: BoardDetailQuery,
) => {
  return http.get(`${SERVICE_URL}/listDetail?${params ? 'id=' + Number(params) : ''}`)
}
export const createNotice: ServiceFunction<BoardCreate, Content<BoardCreate>> = async (
  params: BoardCreate,
) => {
  return http.post(`${SERVICE_URL}/listSave`, params)
}

export const deleteNotice: ServiceFunction<ContentKey, any> = async (params: ContentKey) => {
  return http.del(`${SERVICE_URL}/listDelete?${params ? 'id=' + Number(params) : ''}`)
}
