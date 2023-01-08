<template>
  <div id="document-history-page">
    <document-title
      :document-title="documentTitle"
      page-name="문서 역사"
    >

      <li><NuxtLink :to="`/edit/${documentTitle}`" class="btn">편집</NuxtLink></li>
      <li>
        <NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink>
      </li>
    </document-title>

    <div class="compare-btn">
      <button class="btn">선택 리비전 비교</button>
    </div>

    <controller />

    <ul class="history">
      <li v-for="(item, index) in documentHistory" :key="index">
        <span class="datetime">{{item.datetime}}</span>
        <span class="links">
          (
            <NuxtLink :to="`/w/${documentTitle}?rev=${item.order}&id=${item.id}`">보기</NuxtLink>
            | <NuxtLink :to="`/raw/${documentTitle}?rev=${item.order}&id=${item.id}`">RAW</NuxtLink>
            | <NuxtLink to="#">Blame</NuxtLink>
            | <NuxtLink to="#">이 리비전으로 되돌리기</NuxtLink>
            | <NuxtLink to="#">비교</NuxtLink>
          )
        </span>

        <input type="radio">
        <input type="radio"/>
        <span clsas="order"><b>r{{ item.order }}</b></span>
        <span class="diff" :class="{positive: item.diff > 0, negative: item.diff < 0}">({{ item.diff > 0 ? "+" : "" }}{{ item.diff }})</span>
        <NuxtLink class="user" to="#">{{ item.username != null ? item.username : item.addr }}</Nuxtlink>
        <span class="working">({{ item.working }})</span>
      </li>
    </ul>

    <controller />
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
      isFetchError: false,
    }
  },
  created() {
    this.fetchDocumentHistory(this.documentTitle);
  },
  methods: {
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
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#document-history-page {

  .compare-btn {
    margin: 10px 0;
  }

  .history {
    margin: 20px 0;

    li {
      margin-left: 40px;
      font-size: 14px;
      padding: 5px 0;

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
</style>
