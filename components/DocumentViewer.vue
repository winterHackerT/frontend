<template>
  <div class="document-viewer" v-html="content">
  </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';
import highlightJS from 'highlight.js';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {}
  },
  data () {
    return {
      content: ''
    }
  },
  watch: {
    markdown (newValue) {
      this.content = this.renderDocument(newValue);
    }
  },
  mounted () {
    this.content = this.renderDocument(this.markdown);
  },
  methods: {
    renderDocument(markdown: string) {
      const options: MarkdownIt.Options = {
        html: true,
        xhtmlOut: true,
        highlight: function (str, lang) {
          if (lang && highlightJS.getLanguage(lang)) {
            try {
              return highlightJS.highlight(str, { language: lang }).value;
            } catch (__) {}
          }

          return ''; // use external default escaping
        }
      };

      const content = new MarkdownIt(options)
        .use(require('markdown-it-emoji'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-deflist'))
        .use(require('markdown-it-abbr'))
        .use(require('markdown-it-container'))
        .render(markdown);

      return content;
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/css/variable.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css';

.document-viewer {
  h1, h2, h3, h4, h5, h6 {
    color: $primary;
  }

  h1 {
    font-size: 40px;
    border-bottom: 5px solid $primary;

    margin-top: 20px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 34px;
    border-bottom: 3px solid $primary;

    margin-top: 15px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 30px;
  }

  h4 {
    font-size: 26px;
  }

  h5 {
    font-size: 22px;
  }

  h6 {
    font-size: 18px;
  }

  blockquote {
    border-left: 3px solid $light-secondary;
    padding-left: 5px;
  }

  pre, code {
    border: 1px solid $light-light;
    background-color: $light-light;
    border-radius: 5px;
    padding: 3px 5px;
    margin: 5px 0;
  }

  li {
    margin: 5px;
    list-style-position: inside;

    p {
      display: inline;
    }
  }

  code {
    margin-left: 5px;
    margin-right: 5px;
  }

  table, tr, td {
    border: 1px solid $light-secondary;
    border-collapse: collapse;
    margin: 10px 0;
  }

  thead {
    background-color: $primary;
    color: white;
  }

  td, th {
    padding: 5px 10px;
  }

  a {
    color: $link-primary;
    text-decoration: blink;
  }

  img {
    max-width: 100%;
  }
}
</style>