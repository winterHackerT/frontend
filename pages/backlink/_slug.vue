<template>
  <div>
    <document-title :document-title="documentTitle" page-name="역링크">
      <li><NuxtLink to="#" class="btn">역사</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
    </document-title>

    <fieldset id="namespaceChoiceBox">
      <form method="get">
        <div>
          <label>이름공간 :</label>
          <select name="namespace">
            <option value="문서">문서 (4)</option>
            <option value="틀">틀 (1)</option>
          </select>
          <select name="flag">
            <option value="0">(전체)</option>
            <option value="1">link</option>
            <option value="2">file</option>
            <option value="4">include</option>
            <option value="8">redirect</option>
          </select>
        </div>
        <div class="submitBtn">
          <button class="" type="submit">제출</button>
        </div>
      </form>
    </fieldset>

    <controller/>

    <div class="indexContainter">
      <div v-for="(data, index) in backLinkDataList" :key="index">
        <h3>{{ data.char }}</h3>
        <ul>
          <li v-for="(content, index) in data.list" :key="index">
            <nuxt-link :to="content">{{ content }}</nuxt-link> ({{
              content
            }})
          </li>
        </ul>
      </div>
    </div>

    <controller/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Controller from '../../components/Controller.vue';
export default defineComponent({
  components: { Controller },
  setup() {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
      backlinks: [
        '전자',
        '정부',
        '프레임워크',
        'JAVA',
        'Spring',
        'Boot'
      ],
      backLinkDataList: [
        {
          char: 'a',
          list: ['']
        }
      ]
    }
  },
  mounted() {
    this.backLinkDataList = [];
    if (this.backlinks.length === 0) return;

    this.backlinks.sort();

    let char = this.charFirst(this.backlinks[0][0]);
    let list: string[] = [];

    for (const word of this.backlinks) {
      const currentChar = this.charFirst(word[0]);

      if (char !== currentChar) {
        this.backLinkDataList.push({char, list});

        char = currentChar;
        list = [];
      }

      list.push(word);
    }

    this.backLinkDataList.push({char, list});
  },
  methods: {
    charFirst(str: string) {
      // https://zetawiki.com/wiki/UTF-8_%ED%95%9C%EA%B8%80_%EC%B4%88%EC%84%B1_%EC%B6%94%EC%B6%9C_(%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)
      
      const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
      let result = "";
      for(let i = 0; i < str.length; ++i) {
        const code = str.charCodeAt(i)-44032;
        if (code > -1 && code < 11172) result += cho[Math.floor(code/588)];
        else result += str.charAt(i);
      }
      return result;
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#namespaceChoiceBox {
  border: 1px solid #ccc;
  margin: 0;
  min-width: 0;
  padding: 0.5rem 1rem 1rem;
  display: block;
  min-inline-size: min-content;
  
  margin-top: 20px;

  > * {
    box-sizing: inherit;
  }
  > form {
    margin-top: 0em;
    color: #373a3c;
    word-break: break-all;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    > div {
      font-size: 0.9rem;
      color: #373a3c;
      line-height: 1.5;

      select {
        min-width: 140px;
        height: 25px;
        padding-left: 5px;
      }
    }
    > .submitBtn {
      float: right;
      margin: 0;
      > button {
        background-color: #0275d8;
        border: none;
        color: #fff;
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.5;
        margin: 0;
        padding: 4px 12px;
        text-align: center;
        touch-action: manipulation;
      }
    }
  }
}

.indexContainter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  > div {
    > h3 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 30px 0;
    }
    > ul {
      margin: 0.4em 0 0.4em 1.5em;
      padding-left: 0.5rem;
      > li {
        margin: 0.4em 0;

        a {
          color: $light-primary;
          text-decoration: blink;
        }
      }
    }
  }
}
</style>
