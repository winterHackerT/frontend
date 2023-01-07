<template>
  <div id="document-edit-page">
    <document-title
      :document-title="documentTitle"
      page-name="새 문서 생성"
    >
      <li><NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">삭제</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">이동</NuxtLink></li>
    </document-title>

    <div>
      <DocumentEditor />
    </div>

    <div class="message">
      <label>요약</label>
      <input type="text" />
    </div>

    <div class="extra">
      <p>
        <input type="checkbox" />
        <span>
          문서 편집을 <b>저장</b>하면 당신은 기여한 내용을 <b>CC-BY-NC-SA 2.0 KR</b>으로 배포하고 기여한 문서에 대한 하이퍼링크나 URL을 이용해서 저작자 표기를 하는 것으로 충분하다는 데 동의하는 것입니다. 이 동의는 <b>철회할 수 없습니다.</b>
        </span>
      </p>

      <p>
        <span class="ip-warn">비로그인 상태로 편집합니다. 편집 역사에 IP(0.0.0.0)가 영구히 기록됩니다.</span>
      </p>
    </div>

    <div class="btn-group">
      <button class="btn submit">저장</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

@keyframes red-breath {
  from { color: black; }
  50% { color: $danger; }
  to { color: black; }
}

#document-edit-page {
  .message {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    input[type="text"] {
      margin: 5px 0;
    }
  }

  .extra {
    p {
      padding: 5px 0;
    }

    .ip-warn {
      font-weight: bold;
      animation: red-breath 2s infinite;
    }
  }

  .btn-group {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .submit {
      border: none;
      padding: 7px 30px;
      background-color: $light-primary;
      color: white;
    }
  }
}
</style>