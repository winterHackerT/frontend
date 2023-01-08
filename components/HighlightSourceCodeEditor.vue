<template>
  <div
    ref="editor"
    class="highlight-source-code-editor"
  >
  </div>
</template>

<script lang="ts">
import HighlightJS, { HighlightResult } from 'highlight.js';
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
  mounted() {
    this.convert(this.value, 'markdown');
  },
  methods: {
    convert(src: string, lang: string | undefined) {
      let hl;

      if (lang !== '') {
        hl = HighlightJS.highlight(src, {
          language: lang!,
          ignoreIllegals: true,
        });
      } else {
        hl = HighlightJS.highlightAuto(src);
      }

      const html = this.hl2Table(hl);
      (this.$refs.editor as HTMLElement).innerHTML = html;
    },
    hl2Table(hl: HighlightResult) {
      let result = '';

      const hlHtml = document.createElement('pre');
      hlHtml.innerHTML = hl.value;
      
      hlHtml.innerHTML = hlHtml.innerHTML.replaceAll('\t', '  ');

      const comments = hlHtml.querySelectorAll('span.hljs-comment');
      for (let i = 0; i < comments.length; i++) {
        comments[i].outerHTML = comments[i].outerHTML.replaceAll('\n', '</span>\n<span class="hljs-comment">');
      }

      const lines = hlHtml.innerHTML.split('\n');
      for (let i = 0; i < lines.length; i++) {
        result += `<tr><td class="line">${i + 1}</td><td class="src" contenteditable>${lines[i]}</td></tr>`;
      }

      return `<table>${result}</table>`;
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/css/variable.scss';

.highlight-source-code-editor {
  * {
    font-family: D2Coding;
    font-size: 18px;
  }

  table, tr, td {
    border: none;
    border-spacing: 0;
  }

  tr {
    td {
      padding: 2px 10px;

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
    }

    td.line {
      vertical-align: top;
      background-color: $light-light;
      border-color: $light-light;
      text-align: right;
      color: $primary;
    }
    
    td.src {
      width: 100%;
    }

    td.src:focus {
      border-color: $light-light;
    }

    td.src:focus-visible {
      outline: none;
    }
  }

  tr:hover {
    td.src {
      border-color: $light-light;
    }
  }
}
</style>