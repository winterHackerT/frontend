<template>
  <div id="document-view-page">
    <document-title
      :document-title="documentTitle"
      recent-edit="20XX-XX-XX XX:XX:XX"
    >
      <li>
        <NuxtLink to="#" class="btn star">
          <i class="bi bi-star"></i> 0
          <span class="tooltip">Star</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink>
      </li>
      <li><NuxtLink :to="`/discuss/${documentTitle}`" class="btn">토론</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
      <li><NuxtLink :to="`/history/${documentTitle}`" class="btn">역사</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">ACL</NuxtLink></li>
    </document-title>

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
      documentTitle: 'HackWiki:대문',
    }
},})
</script>

<style scoped></style>
