<template>
  <!-- 공통으로 제외 필요 -->
  <div class="location">
    <span class="ic-home">HOME</span>
    <span>커뮤니티</span>
    <em>통합게시판</em>
  </div>
  <!-- 공통으로 제외 필요 -->
  <div class="tit-area">
    <h3 class="h3-tit">통합게시판</h3>
  </div>
  <!-- Search Common Compnent-->
  <CommonSearch @tabledata="responseData" />

  <table class="list default">
    <colgroup>
      <col style="width: 60px" />
      <col style="width: 80px" />
      <col />
      <col style="width: 80px" />
      <col style="width: 80px" />
      <col style="width: 80px" />
      <col style="width: 120px" />
    </colgroup>
    <thead>
      <tr>
        <th>No</th>
        <th>카테고리</th>
        <th>제목</th>
        <th>첨부파일</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>작성일</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dynamicTableData" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          {{
            item.categoryCd === 'important'
              ? '중요'
              : item.categoryCd === 'normal'
                ? '일반'
                : '공지'
          }}
        </td>
        <td class="l">
          <a href="#" @click="$router.push(`/noticeDetail/${item.boardNo}`)">{{ item.title }}</a>
          <!--<a href="#"
>[롯데백화점] 2024년 5월분 세금계산서 접수기간 안내
<img class="new" src="../../assets/images/new.gif"
/></a> -->
        </td>
        <td><!--<a class="ic-file" href="#">파일</a>--></td>
        <td>{{ item.writerNm }}</td>
        <td>{{ item.viewCnt }}</td>
        <td>{{ item.regDt }}</td>
      </tr>
    </tbody>
  </table>
  <!-- CommonPageNation -->
  <CommonPageNation :pagingprops="paging" />
  <div class="btn-box l mt30">
    <a class="btn btn-green fr" href="#" @click="goRegister()">등록</a>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CommonSearch from '@/components/common/CommonSearch.vue'
import CommonPageNation from '@/components/common/CommonPageNation.vue'
import type { Board } from '@/model/boardModel.ts'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constant'

const router = useRouter()
const dynamicTableData = ref<Board[]>([])
const paging = ref({
  pageable: {
    offset: 0,
    pageNumber: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    paged: true,
  },
  size: 0,
  sort: {
    empty: false,
    sorted: false,
    unsorted: false,
  },
  totalElements: 0,
  totalPages: 0,
})

const responseData = (response: any) => {
  dynamicTableData.value = response.content

  console.log(response.content)
  paging.value.pageable.offset = response.pageable.offset
  paging.value.pageable.pageNumber = response.pageable.pageNumber
  paging.value.pageable.pageSize = response.pageable.pageSize
  paging.value.pageable.paged = response.pageable.paged
  paging.value.size = response.size
  paging.value.sort.empty = response.sort.empty
  paging.value.sort.sorted = response.sort.sorted
  paging.value.sort.unsorted = response.sort.unsorted
  paging.value.totalElements = response.totalElements
  paging.value.totalPages = response.totalPages
}

const goDetail = (boardNo: number) => {
  router.push({ path: '/noticeDetail', query: { boardNo: boardNo } })
}

const goRegister = () => {
  router.push({ path: '/noticeRegistration' })
}
</script>

<style scoped></style>
