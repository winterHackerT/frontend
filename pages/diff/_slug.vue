<template>
  <div id="diff-page">
    <DocumentTitle
      :document-title="documentTitle"
      page-name="비교"
    >
      <li><NuxtLink :to="`/edit/${documentTitle}`" class="btn">편집</NuxtLink></li>
      <li><NuxtLink :to="`/history/${documentTitle}`" class="btn">역사</NuxtLink></li>
      <li><NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink></li>
    </DocumentTitle>

    <div v-if="!isFetchError" class="wrap">
      <div class="title">
        r{{ rev }}
        vs
        r{{ oldrev }}
      </div>
      <div class="diff" v-html="diffHtml"></div>
    </div>

    <div v-else>
      문서를 불러올 수 없습니다!
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface DocumentData {
  "id": number,
  "title": String,
  "content": String,
  "datetime": String,
  "username": String,
  "addr": String,
  "starCount": number
};

export default defineComponent({
  setup () {
    return {}
  },
  data () {
    return {
      documentTitle: this.$route.params.slug as any,
      rev: this.$route.query?.rev,
      oldrev: this.$route.query?.oldrev,
      prevDocumentData: {} as DocumentData,
      oldPrevDocumentData: {} as DocumentData,
      isFetchError: true,
      diffHtml: ''
    }
  },
  mounted() {
    if (!this.rev || !this.oldrev) {
      alert('잘못된 접근입니다!');
      this.$router.back();
    }

    this.fetchDocuments();
  },
  methods: {
    diffRender() {
      const Diff = require('text-diff');
 
      const diff = new Diff();
      const textDiff = diff.main(this.oldPrevDocumentData.content, this.prevDocumentData.content);

      this.diffHtml = diff.prettyHtml(textDiff)
      this.isFetchError = false;
    },
    fetchDocuments() {
      axios
        .get(this.$accessor.api + '/docs/id/' + this.rev)
        .then(response => {
          if (response.data.success) {
            this.prevDocumentData = response.data.data;

            axios
              .get(this.$accessor.api + '/docs/id/' + this.oldrev)
              .then(response => {
                if (response.data.success) {
                  this.oldPrevDocumentData = response.data.data;

                  this.diffRender();
                }
              })
              .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/css/variable.scss';

#diff-page {
  .wrap {
    border: 1px solid $secondary;

    .title {
      padding: 5px 10px;
      font-weight: bold;
      background-color: $light-light;
      border-bottom: 1px solid $secondary;
    }

    .diff {
      padding: 10px;

      ins {
        color: $primary;
        background-color: #00498c55;
        border-radius: 5px;
      }

      del {
        color: $danger;
        background-color: #ff474755;
        border-radius: 5px;
      }
    }
  }
}
</style>