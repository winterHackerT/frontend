<template>
  <div id="login-page">
    <div class="field">
      <label>Username</label>
      <input type="text" />
    </div>

    <div class="field">
      <label>Password</label>
      <input type="text" />
    </div>

    <div class="extra">
      <span>
        <input type="checkbox" />
         자동 로그인
      </span>

      <NuxtLink to="#">[아이디/비밀번호 찾기]</NuxtLink>
    </div>

    <div class="btn-group">
      <button class="btn">계정 만들기</button>
      <button class="btn submit">로그인</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>