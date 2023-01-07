<template>
  <div class="document-editor">
    <div class="tab-bar">
      <div ref="tabs" class="left">
        <button class="btn tab active" @click="setTab(0)">편집기</button>
        <button class="btn tab" @click="setTab(1)">RAW 편집</button>
        <button class="btn tab" @click="setTab(2)">미리보기</button>
      </div>

      <div class="right">
        <div class="editor-toolbar">
          <button class="btn">굵게</button>
          <button class="btn">기울임</button>
          <button class="btn">취소선</button>
          <button class="btn">링크</button>
          <button class="btn">파일</button>
          <button class="btn">파일</button>
          <button class="btn">각주</button>
          <button class="btn">틀</button>
        </div>
      </div>
    </div>

    <main ref="main">
      <section class="active">TAB 1</section>
      <section>TAB 2</section>
      <section>TAB 3</section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  methods: {
    setTab(index: number) {
      const tabs = this.$refs.tabs as HTMLElement;
      const mainElement = this.$refs.main as HTMLElement;

      tabs.querySelector(".active")?.classList.remove("active");
      tabs.querySelectorAll(".btn")[index].classList.add("active");

      mainElement.querySelector(".active")?.classList.remove("active");
      mainElement.querySelectorAll("section")[index].classList.add("active");
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

.document-editor {
  .tab-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .btn {
      padding: 10px 15px;
    }

    .left {
      .tab {
        border: 1px solid transparent;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
      }

      .tab:hover {
        background-color: transparent;
      }
      
      .tab.active {
        border: 1px solid $light-light;
        border-bottom: none;
      }
    }

    .right {
      .editor-toolbar {
        .btn {
          border: none;
          font-weight: bold;
        }
      }
    }
  }

  main {
    width: 100%;
    min-height: 500px;
    border: 1px solid $light-light;

    section {
      display: none;
    }

    section.active {
      display: inline;
    }
  }
}

@media screen and (max-width: $max-table-width) {
  
}
</style>