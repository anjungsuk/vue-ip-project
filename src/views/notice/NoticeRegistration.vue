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
          <th class="fir">작성자 <i class="req">*</i></th>
          <td><input v-model="writerNm" class="input block" type="text" /></td>
          <th class="fir">비밀번호 <i class="req">*</i></th>
          <td><input v-model="passWord" class="input block" type="password" /></td>
        </tr>
        <tr>
          <th class="fir">카테고리 <i class="req">*</i></th>
          <td colspan="3">
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
          <th class="fir">제목 <i class="req">*</i></th>
          <td colspan="3">
            <input v-model="title" class="input" style="width: 100%" type="text" />
          </td>
        </tr>
        <tr>
          <th class="fir">내용 <i class="req">*</i></th>
          <td colspan="3">
            <textarea v-model="cont" style="width: 100%; height: 300px"> </textarea>
          </td>
        </tr>
        <tr>
          <th class="fir">첨부파일 1 <i class="req">*</i></th>
          <td colspan="3">
            <!--  <span><a href="#">상담내역1.xlsx</a> <a class="ic-del" href="#">삭제</a></span>
<br /> -->
            <input class="input block mt10" type="file" />
          </td>
        </tr>
        <!--<tr>
<th class="fir">첨부파일 2</th>
<td colspan="3">
<span><a href="#">상담내역2.xlsx</a> <a class="ic-del" href="#">삭제</a></span>
<br />
<input class="input block mt10" type="file" />
</td>
</tr>
<tr>
<th class="fir">첨부파일 3</th>
<td colspan="3">
<input class="input block mt10" type="file" />
</td>
</tr> -->
      </tbody>
    </table>

    <div class="btn-box r">
      <a class="btn btn-red" href="#" @click="noticeRegistration()">저장</a>
      <a class="btn btn-default" href="#">취소</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createNotice } from '@/service/apis/noticeService.ts'
import { useRouter } from 'vue-router'
import type { BoardCreate } from '@/model/boardModel.ts'

const categoryValue = ref('')
const searchCategorys = ref([
  { text: '전체', value: '' },
  { text: '공지', value: 'notice' },
  { text: '중요', value: 'important' },
  { text: '일반', value: 'normal' },
])
const router = useRouter()
const writerNm = ref<string>('')
const passWord = ref<string>('')
const title = ref<string>('')
const cont = ref<string>('')

const noticeRegistration = async () => {
  const param: BoardCreate = {
    writerNm: writerNm.value,
    categoryCd: categoryValue.value,
    password: passWord.value,
    title: title.value,
    cont: cont.value,
  }

  await createNotice(param)
    .then((res) => {
      alert('저장이 완료 되었습니다.')
      router.push('/notice')
    })
    .catch((err) => {
      alert('저장에 실패하였습니다.')
      console.log(err.statusText)
    })
}
</script>

<style scoped></style>
