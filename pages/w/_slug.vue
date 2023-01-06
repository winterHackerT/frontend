<template>
  <div id="document-view-page">
    <document-title
      v-if="!isFetchError"
      :document-title="documentTitle"
      :recent-edit="recentEdit"
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

    <div v-if="isFetchError" class="fetch-error-message">
      <spna>문서를 읽어오는 과정에서 오류가 발생했습니다!</spna>
    </div>

    <div v-if="isNotFound" class="document-not-found">
      <span>해당 문서를 찾을 수 없습니다.</span>
      <br />
      <br />
      <NuxtLink to="#">[새 문서 만들기]</NuxtLink>

      <div v-if="documentHistory" class="document-history">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>

    <index-components />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
      documentHistory: [],
      recentEdit: "",
      isNotFound: false,
      isFetchError: false,
    }
  },
  mounted() {
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
          console.log(response.data);
          this.documentHistory = response.data;
        })
        .catch(error => {
          this.isFetchError = true;
          console.error(error);
        });
    }
  },
}) 
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#document-view-page {
  #title {
    .top {
      margin-bottom: 10px;

      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      h1 {
        font-size: 35px;
      }

      nav {
        position: relative;
        top: 6px;

        ul {
          li {
            list-style: none;
            float: left;

            position: relative;

            a {
              font-size: 14px;
              color: black;
              text-decoration: blink;
              padding: 8px 15px;
            }

            .star.btn {
              .tooltip {
                color: white;
                font-size: 18px;

                padding: 5px 20px;
                display: none;

                position: absolute;
                bottom: 100%;
                left: 0;
                margin-bottom: 20px;

                background-color: black;
                border-radius: 20px;
              }

              .tooltip::after {
                content: '';

                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid black;

                position: absolute;
                bottom: -10px;
                left: 50%;
                margin-left: -10px;
              }

              .bi-star {
                color: red;
                margin-right: 5px;
              }
            }

            .star.btn:hover {
              .tooltip {
                display: inline;
              }
            }
          }
        }
      }
    }
  }

  .fetch-error-message {
    color: $danger;
  }
}
</style>
