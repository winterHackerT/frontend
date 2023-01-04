<template>
  <footer>
    <div class="links">
      <a href="https://github.com/" target="_blank">
        <img src="/images/github.png" alt="github" />
      </a>

      <a href="https://nuxtjs.org/" target="_blank">
        <img src="/images/nuxt_logo.png" alt="nuxt logo" />
      </a>
    </div>

    <p class="info">
      Hack WIKI |
      <a href="https://gdsc.community.dev/dong-eui-university/" target="_blank"
        >GDSC-DEU</a
      >
      |
      <a href="https://developers.google.com/" target="_blank"
        >Google Developers</a
      >
      |
      <a href="https://www.deu.ac.kr/www" target="_blank"
        >Dong-Eui University</a
      >
      | Programming with <i class="bi bi-heart"></i> in Winter Project 2023
    </p>

    <p class="info">
      Time Zone in Asia/Seoul | Its working by Hack WIKI Engine
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

footer {
  width: 100%;
  padding: 50px 0;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;

    a {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;

      img {
        width: 40px;
      }
    }

    a::after {
      height: 30px;
      content: '';
      border-right: 2px solid $light-secondary;
      margin: auto 20px;
    }

    a:last-child::after {
      border-right: none;
      margin: 0;
    }
  }

  .info {
    color: $secondary;
    font-size: 16px;
    letter-spacing: 1px;
    text-align: center;

    padding: 5px 10px;

    a {
      color: $light-primary;
      text-decoration: blink;
    }
  }
}
</style>
