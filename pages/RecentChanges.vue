<template>
  <div id="recent-changes-page">
    <DocumentTitle document-title="최근 변경내역" />

    <div class="btn-group">
      <NuxtLink to="#">[전체]</NuxtLink>
       | <NuxtLink to="#">[새 문서]</NuxtLink>
       | <NuxtLink to="#">[삭제]</NuxtLink>
       | <NuxtLink to="#">[이동]</NuxtLink>
       | <NuxtLink to="#">[되돌림]</NuxtLink>
    </div>

    <table v-if="!isFetchError" class="recent-changes">
      <thead>
        <td>항목</td>
        <td>수정자</td>
        <td>수정 시간</td>
      </thead>

      <tbody>
        <tr v-for="item, index in documentHistory" :key="index">
          <td class="title">
            <NuxtLink :to="`/w/${item.title}`">{{ item.title }}</NuxtLink>

            <NuxtLink to="#">[역사]</NuxtLink>
            <NuxtLink to="#">[비교]</NuxtLink>
            <NuxtLink to="#">[토론]</NuxtLink>
          </td>

          <td class="user">
            <NuxtLink to="#">{{ item.username ? item.username : item.addr }}</NuxtLink>
          </td>
          
          <td class="datetime">
            {{ item.datetime.substring(0, 10) }}
            {{ item.datetime.substring(11, 16) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface DocumentHistroy {
  id: number,
  title: string,
  content: string,
  datetime: string,
  username: string,
  addr: string,
  starCount: number
};

export default defineComponent({
  setup () {
    return {}
  },
  data() {
    return {
      documentHistory: [] as DocumentHistroy[],
      isFetchError: true
    }
  },
  mounted() {
      this.fetchDocumentHistory();
  },
  methods: {
    fetchDocumentHistory() {
      axios
        .get(this.$accessor.api + '/docs/recent')
        .then(response => {
          if (response.data.success) {
            this.isFetchError = false;
            this.documentHistory = response.data.data;
          }
        })
        .catch(error => console.error(error));
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#recent-changes-page {
  .btn-group {
    width: fit-content;
    padding: 5px 10px;
    background-color: $light-light;

    a {
      padding: 0 3px;
    }
  }

  .recent-changes {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;

    thead {
      td {
        padding: 10px 5px;
        font-weight: bold;
        border-bottom: 1px solid $light-primary;
      }
    }

    tbody {
      td {
        padding: 10px 5px;
        border-bottom: 1px solid $light-light;
      }

      td.user {
        width: 200px;
      }

      td.datetime {
        width: 150px;
      }
    }
  }
}

@media screen and (max-width: $max-mobile-width) {
  #recent-changes-page {
    .recent-changes tbody td.user {
      width: 100px;
    }
  }
}
</style>