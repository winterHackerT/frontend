<template>
  <div class="list-box">
    <h2>{{ title }}</h2>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
        <span v-if="item.meta" class="meta">{{ item.meta }}</span>
      </li>
    </ul>

    <NuxtLink class="more-btn" :to="moreLink">[ 더 보기 ]</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    items: {
      type: Array as PropType<any>,
      default: () => [
        {
          title: 'title',
          link: '#',
          meta: 'meta',
        },
      ],
    },
    moreLink: {
      type: String,
      default: '#',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

.list-box {
  border: 1px solid $light-light;
  background-color: white;

  a {
    color: $light-primary;
    text-decoration: blink;
  }

  a:hover {
    text-decoration: underline;
  }

  h2 {
    font-size: 22px;

    padding: 18px 15px;
    border-bottom: 1px solid $light-light;
  }

  ul {
    li {
      padding: 5px 10px;
      list-style: none;
      border-bottom: 1px solid $light-light;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      a {
        font-size: 16px;
      }
    }
  }

  .more-btn {
    float: right;
    padding: 10px 15px;
  }
}
</style>
