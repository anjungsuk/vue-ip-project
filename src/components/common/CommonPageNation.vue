<template>
  <div class="paginate_complex">
    <a class="direction fir" href="#" v-bind:disabled="isFirstPage" @click.prevent="goToFirstPage">
      처음
    </a>
    <a class="direction prev" href="#" v-bind:disabled="isFirstPage" @click.prevent="goToPrevPage"
      >이전</a
    >
    <a
      v-for="page in pages"
      :key="page"
      :class="{ active: currentPage === page }"
      href="#"
      @click.prevent="goToPage(page)"
    >
      <strong v-if="page === currentPage">{{ page }}</strong>
      <span v-else>{{ page }}</span>
    </a>
    <!-- 다음 버튼 -->
    <a class="direction next" href="#" v-bind:disabled="isLastPage" @click.prevent="goToNextPage"
      >다음</a
    >

    <!-- 끝 버튼 -->
    <a class="direction last" href="#" v-bind:disabled="isLastPage" @click.prevent="goToLastPage"
      >끝</a
    >
    <div class="right">
      <select class="select" style="width: 120px">
        <option>10개씩보기</option>
        <option>30개씩보기</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps(['pagingprops'])

const currentPage = ref(0)
const pageSize = ref(0)
const totalPage = ref(0)
watch(
  () => props.pagingprops,
  (newValue) => {
    console.log('newValue : ' + JSON.stringify(newValue.pageable))
    currentPage.value = newValue.pageable.pageNumber + 1
    pageSize.value = newValue.pageable.pageSize
    totalPage.value = newValue.totalPages
  },
  {
    deep: true,
    immediate: true,
  },
)
console.log('currentPage : ' + currentPage.value)
console.log('pageSize : ' + pageSize.value)
console.log('totalPage : ' + totalPage.value)

const currentGroup = computed(() =>
  Math.ceil((props.pagingprops.pageable.pageNumber + 1) / props.pagingprops.pageable.pageSize),
)

const startPage = computed(() => (currentGroup.value - 1) * props.pagingprops.pageable.pageSize + 1)
const endPage = computed(() =>
  Math.min(currentGroup.value * props.pagingprops.pageable.pageSize, props.pagingprops.totalPages),
)
const pages = computed(() => {
  const result = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    result.push(i)
  }
  return result
})
//처음으로가기, 끝으로가기 활성화 작업
const isFirstPage = computed(() => props.pagingprops.pageable.pageNumber + 1 === 1)
const isLastPage = computed(
  () => props.pagingprops.pageable.pageNumber + 1 === props.pagingprops.totalPages,
)

//Move to Navigation
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPage.value) {
    currentPage.value = page
  }
}
//go To FistPage
const goToFirstPage = () => {
  goToPage(1)
}
const goToLastPage = () => {
  goToPage(totalPage.value)
}
const goToPrevPage = () => {
  goToPage(currentPage.value - 1)
}
const goToNextPage = () => {
  goToPage(currentPage.value + 1)
}
</script>

<style scoped></style>
