<template>
  <div id="document-edit-page">
    <document-title
      :document-title="documentTitle"
      page-name="문서 편집"
    >
      <li><NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink></li>
      <li><NuxtLink to="#" class="btn danger">삭제</NuxtLink></li>
      <li><NuxtLink to="#" class="btn">이동</NuxtLink></li>
    </document-title>

    <div v-if="!isFetchError">
      <div class="editor">
        <DocumentEditor ref="editor" v-model="content" />
      </div>

      <div class="message">
        <label>요약</label>
        <input v-model="message" type="text" />
      </div>

      <div class="extra">
        <p>
          <input ref="checkTerms" type="checkbox" />
          <span>
            문서 편집을 <b>저장</b>하면 당신은 기여한 내용을 <b>CC-BY-NC-SA 2.0 KR</b>으로 배포하고 기여한 문서에 대한 하이퍼링크나 URL을 이용해서 저작자 표기를 하는 것으로 충분하다는 데 동의하는 것입니다. 이 동의는 <b>철회할 수 없습니다.</b>
          </span>
        </p>

        <p>
          <span class="ip-warn">비로그인 상태로 편집합니다. 편집 역사에 IP(0.0.0.0)가 영구히 기록됩니다.</span>
        </p>
      </div>

      <div class="btn-group">
        <button class="btn submit" @click="saveDocument()">저장</button>
      </div>
    </div>

    <div v-else class="fetch-error-message">
      서버와 통신중에 오류가 발생했습니다!
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

interface DocumentData {
  "id": number,
  "title": String,
  "content": String,
  "datetime": String,
  "username": String,
  "addr": String,
  "starCount": number
};

export default defineComponent({
  setup () {
    return {}
  },
  data() {
    return {
      documentTitle: this.$route.params.slug as any,
      documentData: {} as DocumentData,
      content: '',
      message: '문서 편집',
      isFetchError: true,
    }
  },
  created() {
    this.fetchDocument();
  },
  methods: {
    fetchDocument() {
      axios
        .get(this.$accessor.api + '/docs/' + this.documentTitle)
        .then(response => {
          this.isFetchError = false;
          this.documentData = response.data.data;
          
          if (response.data.success) {
            this.content = this.documentData.content as string;
          }
        })
        .catch(error => console.error(error));
    },
    saveDocument() {
      if (this.content.length < 2) {
        alert("컨턴츠 내용의 길이는 2자 이상 입력해야 합니다");
        return;
      } else if (this.message.length < 2) {
        alert("요약 내용의 길이는 2자 이상 입력해야 합니다");
        return;
      } else if (!(this.$refs.checkTerms! as HTMLInputElement).checked) {
        alert("아래 약관에 동의해주시기 바랍니다");
        return;
      }

      const config = {};

      const data = {
        "title": this.documentTitle,
        "content": this.content,
        "message": this.message
      };

      axios
        .post(this.$accessor.api + "/docs", data, config)
        .then(response => {
          if (response.data.success) {
            this.$router.push(`/w/${this.documentTitle}`);

          } else {
            alert("문서 저장 과정에서 오류가 발생했습니다!");
            console.warn(response.data.message);
          }
        })
        .catch(error => {
          alert("문서 저장 과정에서 오류가 발생했습니다!");
          console.error(error);
        });
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
    margin: 20px 0;

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

  .fetch-error-message {
    color: $danger;
  }
}
</style>