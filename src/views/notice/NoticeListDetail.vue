<template>
  <div id="contents">
    <div class="location">
      <span class="ic-home">HOME</span><span>커뮤니티</span><em>통합게시판</em>
    </div>

    <div class="tit-area">
      <h3 class="h3-tit">통합게시판</h3>
    </div>

    <table class="write">
      <colgroup>
        <col style="width: 150px" />
        <col />
        <col style="width: 150px" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <th class="fir">작성자</th>
          <td>
            <span>{{ state.formData.writerNm }}</span>
          </td>
          <th class="fir">작성일시</th>
          <td>{{ state.formData.regDt }}</td>
        </tr>
        <tr>
          <th class="fir">카테고리</th>
          <td colspan="3">
            {{
              state.formData.categoryCd === 'important'
                ? '중요'
                : state.formData.categoryCd === 'normal'
                  ? '일반'
                  : '공지'
            }}
          </td>
        </tr>
        <tr>
          <th class="fir">제목</th>
          <td colspan="3">{{ state.formData.title }}</td>
        </tr>
        <tr>
          <th class="fir">내용</th>
          <td colspan="3">
            {{ state.formData.cont }}
          </td>
        </tr>
        <tr>
          <th class="fir">첨부파일</th>
          <td colspan="3">
            <!--<span><a href="#">상담내역1.xlsx</a></span>
<br />
<span><a href="#">상담내역2.xlsx</a></span> -->
          </td>
        </tr>
      </tbody>
    </table>

    <div class="btn-box r">
      <a class="btn btn-green" href="#">수정</a>
      <a class="btn btn-red" href="#" @click="goDelete()">삭제</a>
      <a class="btn btn-default" href="#">목록</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { deleteNotice, getNoticeDetail } from '@/service/apis/noticeService.ts'
import { ServiceError } from '@/error'

const router = useRouter()

onMounted(() => {
  const id = router.currentRoute.value.params.id

  getDetail(id)
})
const state = reactive({
  formData: {},
})

const getDetail = async (id: any) => {
  const resp = await getNoticeDetail(id)

  if (resp.status === 200) {
    state.formData = resp.data
  } else {
    throw new ServiceError(resp.statusText)
  }
}

const goDelete = async () => {
  const resp = await deleteNotice(state.formData.boardNo)
  if (resp.status !== 200) {
    throw new ServiceError(resp.statusText)
  } else {
    alert('삭제가 완료 되었습니다.')

    router.push({
      path: '/notice',
    })
  }
}
</script>
<style scoped></style>
