<template>
  <div id="document-view-page">
    <section id="title">
      <div class="top">
        <h1>
          {{ documentTitle }}
          <small v-if="pageName != ''"> ({{ pageName }})</small>
        </h1>

        <nav>
          <ul>
            <slot></slot>
          </ul>
        </nav>
      </div>

      <span v-if="recentEdit != ''" id="last-modified-datetime">
        최근 수정 시간: {{ recentEdit }}
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    documentTitle: {
      type: String,
      default: 'document title',
    },
    pageName: {
      type: String,
      default: '',
    },
    recentEdit: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
#document-view-page {
  #title {
    .top {
      margin-bottom: 10px;

      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      h1 {
        font-size: 35px;

        small {
          font-weight: normal;
        }
      }

      nav {
        position: relative;
        top: 6px;

        ul {
          li {
            list-style: none;
            float: left;

            position: relative;

            a {
              font-size: 14px;
              color: black;
              text-decoration: blink;
              padding: 8px 15px;
            }

            .star.btn {
              .tooltip {
                color: white;
                font-size: 18px;

                padding: 5px 20px;
                display: none;

                position: absolute;
                bottom: 100%;
                left: 0;
                margin-bottom: 20px;

                background-color: black;
                border-radius: 20px;
              }

              .tooltip::after {
                content: '';

                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid black;

                position: absolute;
                bottom: -10px;
                left: 50%;
                margin-left: -10px;
              }

              .bi-star {
                color: red;
                margin-right: 5px;
              }
            }

            .star.btn:hover {
              .tooltip {
                display: inline;
              }
            }
          }
        }
      }
    }

    #last-modified-datetime {
      font-size: 14px;
      float: right;
    }
  }
}
</style>