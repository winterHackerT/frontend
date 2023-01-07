<template>
  <div>
    <div class="tab-bar">
      <div class="left">
        <button class="btn tab">편집기</button>
        <button class="btn tab">RAW 편집</button>
        <button class="btn tab">미리보기</button>
      </div>

      <div class="right">
        <div class="editor-toolbar">
          <button class="btn">굵게</button>
          <button class="btn">기울임</button>
          <button class="btn">취소선</button>
          <button class="btn">링크</button>
          <button class="btn">파일</button>
          <button class="btn">파일</button>
          <button class="btn">각주</button>
          <button class="btn">틀</button>
        </div>
      </div>
    </div>

    <main>
      <!-- <section v-ref=""></section>
      <section v-ref=""></section>
      <section v-ref=""></section> -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style scoped>

</style>