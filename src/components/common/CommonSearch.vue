<template>
  <div id="hideDv" class="hide-dv mt10">
    <table class="view">
      <colgroup>
        <col style="width: 150px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th>카테고리</th>
          <td>
            <select v-model="categoryValue" class="select" style="width: 150px">
              <option
                v-for="(searchCategory, index) in searchCategorys"
                v-bind:key="index"
                :value="searchCategory.value"
              >
                {{ searchCategory.text }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>검색어</th>
          <td>
            <select v-model="searchValue" class="select" style="width: 150px">
              <option
                v-for="(searchType, index) in searchTypes"
                v-bind:key="index"
                :value="searchType.value"
              >
                {{ searchType.text }}
              </option>
            </select>
            <input v-model="searchKeyword" class="input" style="width: 300px" type="text" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="btn-box btm l">
    <a class="btn btn-red fr" href="#" @click="onSearch">검색</a>
  </div>
  <div class="tbl-hd noBrd mb0">
    <span class="total">검색 결과 : {{ totalCount }} 건</span>
    <div class="right">
      <span class="spanTitle">정렬 순서 :</span>
      <select v-model="listOrderValue" class="select" style="width: 120px">
        <option
          v-for="(listOrderType, index) in listOrderTypes"
          v-bind:key="index"
          :value="listOrderType.value"
        >
          {{ listOrderType.text }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped></style>

<script lang="ts" setup>
/*
  import sort 기준..
  1. vue 관련
  2. third party
  3. componenet, hooks ....
  4. css

 */
import { onMounted, ref } from 'vue'
import { ServiceError } from '@/error'
import { getNoticeLists } from '@/service/apis/noticeService'
import type { Board, BoardQuery } from '@/model/boardModel.ts'
import { DEFAULT_PAGE_SIZE } from '@/constant'
import type { Contents } from '@/model/types.ts' /*onMounted...
 * 리스트 화면부 초기 로딩을 위한 Mount시 로드 진행
 */

/*onMounted...
 * 리스트 화면부 초기 로딩을 위한 Mount시 로드 진행
 */
onMounted(() => {
  onSearch(1)
})
const responseEmit = defineEmits(['tabledata'])

const categoryValue = ref('')
const searchCategorys = ref([
  { text: '전체', value: '' },
  { text: '공지', value: 'notice' },
  { text: '중요', value: 'important' },
  { text: '일반', value: 'normal' },
])
const searchValue = ref('')
const searchTypes = ref([
  { text: '전체', value: '' },
  { text: '제목', value: 'title' },
  { text: '내용', value: 'content' },
  { text: '제목+내용', value: 'titletContent' },
  { text: '작성자명', value: 'writer' },
])
const searchKeyword = ref('')

/*검색 카운트*/
const totalCount = ref(0)

/*정렬순서*/
const listOrderValue = ref('createDate')
const listOrderTypes = ref([
  {
    text: '최근 작성일',
    value: 'createDate',
  },
  {
    text: '조회수',
    value: 'viewCnt',
  },
])

const onSearch = async (page: number) => {
  try {
    const respData = await getSearchItems(<BoardQuery>{
      page: page ? page - 1 : 0,
      size: DEFAULT_PAGE_SIZE,
      searchCategory: categoryValue.value ? categoryValue.value : undefined,
      searchType: searchValue.value ? searchValue.value : undefined,
      searchKeyword: searchKeyword.value ? searchKeyword.value : undefined,
      sort: listOrderValue.value ? listOrderValue.value : undefined,
    })
    totalCount.value = respData.totalElements

    //NoticeList.Vue 페이지로 게시글 데이터 이동 Chide to Parent
    responseEmit('tabledata', respData)
  } catch (e) {
  } finally {
  }
}

const getSearchItems = async (query: BoardQuery): Promise<Contents<Board>> => {
  const resp = await getNoticeLists(query)

  if (resp.status !== 200) {
    throw new ServiceError(resp.statusText)
  }
  return resp.data
}
</script>
