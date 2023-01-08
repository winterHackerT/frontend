<template>
  <div id="document-view-page">
    <document-title
      :document-title="documentTitle"
      :page-name="`r${documentVersion} RAW`"
    >
    
      <li><NuxtLink :to="`/history/${documentTitle}`" class="btn">역사</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
      <li>
        <NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink>
      </li>
    </document-title>

    <textarea id="rawDataField" v-model="rawData" disabled readonly></textarea>

  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
      documentVersion: this.$route.query?.rev as any,
      documentId: this.$route.query?.id as any,
      rawData: '',
    }
  },
  mounted() {
    this.fetchDocument();
  },
  methods: {
    fetchDocument() {
      axios
        .get(this.$accessor.api + '/docs/id/' + this.documentId)
        .then(response => {
          if (response.data.success) {
            this.rawData = response.data.data.content;
          }
        })
        .catch(error => console.error(error))
    }
  }
})
</script>

<style lang="scss" scoped>
#document-view-page {
  #rawDataField {
    background-color: #eceeef;
    opacity: 1;
    height: 600px;
  }
}
</style>
