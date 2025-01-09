import type { ContentKey, ContentQuery } from '@/model/types.ts'

export interface Board {
  boardNo: number
  categoryCd: string
  cont: string
  title: string
  writerNm: string
  regDt: string
  modDt: string
  viewCnt: number
}

export interface BoardCreate {
  title: string
  cont: string
  writerNm: string
  categoryCd: string
  password: string
}

export interface BoardQuery extends ContentQuery {}

export interface BoardDetailQuery extends ContentKey {}
