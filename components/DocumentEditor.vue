<template>
  <div class="document-editor">
    <div class="tab-bar">
      <div ref="tabs" class="left">
        <button class="btn tab active" @click="setTab(0)">편집기</button>
        <button class="btn tab" @click="setTab(1)">RAW 편집</button>
        <button class="btn tab" @click="setTab(2)">미리보기</button>
      </div>
    </div>

    <main ref="main">
      <section class="active editor">
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

        <div>TAB 1</div>
      </section>

      <section class="raw-editor">
        <textarea :value="value" @change="change"></textarea>
      </section>

      <section class="preview">
        <DocumentViewer :markdown="content" />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {}
  },
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    setTab(index: number) {
      const tabs = this.$refs.tabs as HTMLElement;
      const mainElement = this.$refs.main as HTMLElement;

      tabs.querySelector(".active")?.classList.remove("active");
      tabs.querySelectorAll(".btn")[index].classList.add("active");

      mainElement.querySelector(".active")?.classList.remove("active");
      mainElement.querySelectorAll("section")[index].classList.add("active");
    },
    change(event: any) {
      this.$emit('input', event.target.value);
      this.content = event.target.value;
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

.document-editor {
  position: relative;

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
  }

  main {
    width: 100%;
    min-height: 500px;
    border: 1px solid $light-light;

    section {
      width: 100%;
      height: 100%;
      display: none;
    }

    section.active {
      display: inline;
    }

    .editor {
      .editor-toolbar {
        position: absolute;
        top: 0;
        right: 0;

        text-align: right;

        .btn {
          border: none;
          font-weight: bold;
        }
      }
    }

    .raw-editor {
      textarea {
        width: 100%;
        min-height: 500px;
        resize: vertical;
        border: 1px solid $light-light;

        font-family: D2Coding monospace;
        font-size: 16px;
      }

      textarea:focus-visible {
        outline: none;
      }
    }
  }
}

@media screen and (max-width: $max-table-width) {
  .document-editor {
    main {
      .editor {
        .editor-toolbar {
          position: unset;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>