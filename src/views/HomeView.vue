<template>
  <div class="warp">
    <div id="header">
      <LayoutTop />
    </div>
    <div class="container">
      <div id="lm">
        <Lnb />
      </div>
      <div id="contents">
        <RouterView />
      </div>
      <!-- TODO: css 해결때까지만 잠시 주석처리..<LayoutRight /> -->
    </div>
    <div id="footer">
      <LayoutFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutTop from '@/components/layout/LayoutTop.vue'
import Lnb from '@/components/layout/LayoutInb.vue'
import LayoutFooter from '@/components/layout/LayoutFooter.vue'
</script>
