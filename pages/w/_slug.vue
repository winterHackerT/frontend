<template>
  <div id="document-view-page">
    <document-title
      v-if="!isFetchError"
      :document-title="documentTitle"
      :recent-edit="recentEdit"
      :page-name="`${documentVersion}`"
    >
    <div v-if="!isFetchError && !isNotFound">
      <li>
        <NuxtLink to="#" class="btn star">
          <i class="bi bi-star"></i> 0
          <span class="tooltip">Star</span>
        </NuxtLink>
      </li>

      <li><NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink></li>
      <li><NuxtLink :to="`/discuss/${documentTitle}`" class="btn">토론</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
      <li><NuxtLink :to="`/history/${documentTitle}`" class="btn">역사</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">ACL</NuxtLink></li>
    </div>

    <div v-else>
      <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
      <li><NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink></li>
    </div>
    </document-title>

    <div v-if="isFetchError" class="fetch-error-message">
      <span>문서를 읽어오는 과정에서 오류가 발생했습니다!</span>
    </div>

    <div v-if="isNotFound" class="document-not-found">
      <span>해당 문서를 찾을 수 없습니다.</span>
      <br />
      <br />
      <NuxtLink to="#">[새 문서 만들기]</NuxtLink>

      <div v-if="documentHistory" class="document-history">
        <b class="title">이 문서의 역사</b>
        
        <ul>
          <li v-for="history, index in documentHistory.slice(0, 3)" :key="index">
            <span class="datetime">{{ history.datetime.substring(0, 10) }} {{ history.datetime.substring(11, 19) }}</span>
            <b class="order">r{{ history.order }}</b>
            <span class="working">({{ history.working }})</span>
            <span class="diff" :class="{positive: history.diff > 0, negative: history.diff < 0}">({{ history.diff > 0 ? "+" : "" }}{{ history.diff }})</span>
            <NuxtLink to="#">{{ history.username != null ? history.username : history.addr }}</NuxtLink>
            <span class="message">( <span>{{ history.message }}</span> )</span>
          </li>
        </ul>

        <NuxtLink :to="`/history/${documentTitle}`">[더보기]</NuxtLink>
      </div>
    </div>

    <content v-if="!isFetchError && !isNotFound">
      <classification-block v-if="!isFetchError && !isFetchError && !isNotFound"/>
      <index-components />
    </content>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

interface DocumentHistroy {
  addr: String,
  datetime: String,
  id: Number,
  length: Number,
  message: String,
  order: Number,
  username: String,
  working: String,
  diff: number
};

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
      documentHistory: [] as DocumentHistroy[],
      recentEdit: "",
      documentVersion: this.$route.query?.rev ? `r${this.$route.query?.rev} 판` : '',
      isNotFound: false,
      isFetchError: false,
    }
  },
  created() {
    this.fetchDocument(this.documentTitle);
    this.fetchDocumentHistory(this.documentTitle);
  },
  methods: {
    fetchDocument(documentTitle: String) {
      axios
        .get(this.$accessor.api + "/docs/" + documentTitle)
        .then(response => {
          if (response.data.success) {
            this.recentEdit = "20XX-XX-XX XX:XX:XX"
          } else {
            this.isNotFound = true;
          }
        })
        .catch(error => {
          this.isFetchError = true;
          console.error(error);
        });
    },
    fetchDocumentHistory(documentTitle: String) {
      axios
        .get(this.$accessor.api + "/docs/history/" + documentTitle)
        .then(response => {
          this.documentHistory = response.data.data;
          this.documentHistory.forEach((el, index) => {el.diff = this.diffDocument(index)});
        })
        .catch(error => {
          this.isFetchError = true;
          console.error(error);
        });
    },
    diffDocument(index: number) {
      if (index < 0 || index >= this.documentHistory.length) {
        return 0;
      }

      const currentLenght = this.documentHistory[index].length as number;

      if (index === this.documentHistory.length - 1) {
        return currentLenght;

      } else {
        const prevLength = this.documentHistory[index + 1].length as number;
        return currentLenght - prevLength;
      }
    }
  },
}) 
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#document-view-page {
  .fetch-error-message {
    color: $danger;
  }

  .document-not-found {
    .document-history {
      margin: 40px 0;

      > ul {
        margin: 20px 0;

        li {
          margin-left: 50px;

          .working {
            font-style: italic;
          }

          .diff.positive {
            color: green;
          }

          .diff.negative {
            color: $danger;
          }
          
          .message {
            color: $light-secondary;
          }
        }
      }
    }
  }
}
</style>
