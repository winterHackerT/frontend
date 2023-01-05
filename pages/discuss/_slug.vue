<template>
  <div>
    <document-title :document-title="documentTitle" page-name="토론" />
    <h3>편집 요청</h3>
    <NuxtLink to="#">[닫힌 편집 요청 보기]</NuxtLink>
    <h3>토론</h3>
    <NuxtLink to="#">[닫힌 토론 목록 보기]</NuxtLink>
    <h3 id="newDiscussTitle">새 주제 생성</h3>
    <form>
      <div>
        <label for="newDiscussTitle">주제</label>
        <input type="text" />
      </div>
      <div>
        <label for="newDiscussContent">내용</label>
        <input type="text" />
      </div>
      [알림] 비로그인 상태로 토론 주제를 생성합니다. 토론 내역에 IP(127.0.0.1)가 영구히 기록됩니다.
      <div>
        <button type="submit">전송</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
    }
  },
})
</script>

<style lang="scss" scoped>
#newDiscussTitle {
  border-top: 2px dashed gray;
  margin: 0.2em 0 0.8em;
  padding-top: 1.5em;
}
</style>
