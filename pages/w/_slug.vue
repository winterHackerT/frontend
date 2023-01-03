<template>
  <div id="document-view-page">
    <section id="title">
      <div class="top">
        <h1>{{ documentTitle }}</h1>

        <nav>
          <ul>
            <li><NuxtLink to="#" class="btn"><i class="bi bi-star"></i> 0</NuxtLink></li>
            <li><NuxtLink to="#" class="btn">역링크</NuxtLink></li>
            <li><NuxtLink to="#" class="btn">토론</NuxtLink></li>
            <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
            <li><NuxtLink to="#" class="btn">역사</NuxtLink></li>
            <li><NuxtLink to="#" class="btn">ACL</NuxtLink></li>
          </ul>
        </nav>
      </div>

      <span id="last-modified-datetime">
        최근 수정 시간: 20XX-XX-XX XX:XX:XX
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  data () {
    return {
      documentTitle: this.$route.params.slug,
    }
  },
  head () {
    return {
      title: `${this.documentTitle} - ${this.$accessor.title}`,
    }
  }
})
</script>

<style lang="scss" scoped>
#document-view-page {
  padding: 20px;

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
            float:left;

            a {
              font-size: 14px;
              color: black;
              text-decoration: blink;
              padding: 8px 15px;
            }
          }
        }
      }
    }

    #last-modified-datetime {
      font-size: 14px;
      float: right;
    }
  }
}
</style>