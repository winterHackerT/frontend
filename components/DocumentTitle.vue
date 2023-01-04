<template>
    <div id="document-view-page">
      <section id="title">
        <div class="top">
          <h1>{{ documentTitle }} <small v-if="isBacklinkPage()"> (역링크)</small></h1>
  
          <nav>
            <ul>
              <li v-if="!isBacklinkPage()">
                <NuxtLink to="#" class="btn star">
                  <i class="bi bi-star"></i> 0
                  <span class="tooltip">Star</span>
                </NuxtLink>
              </li>
  
              <li v-if="!isBacklinkPage()"><NuxtLink to="#" class="btn">역링크</NuxtLink></li>
              <li v-if="!isBacklinkPage()"><NuxtLink to="#" class="btn">토론</NuxtLink></li>
              <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
              <li><NuxtLink to="#" class="btn">역사</NuxtLink></li>
              <li v-if="!isBacklinkPage()"><NuxtLink to="#" class="btn">ACL</NuxtLink></li>
            </ul>
          </nav>
        </div>

        <span v-if="!isBacklinkPage()" id="last-modified-datetime">
            최근 수정 시간: 20XX-XX-XX XX:XX:XX
        </span>
      </section>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    setup () {
      return {}
    },
    data () {
      return {
        documentTitle: this.$route.params.slug,
        pageRoute: this.$route.name,
      }
    },
    methods: {
      isBacklinkPage () {
        return this.pageRoute === 'backlink-slug'
      },
    },
    head () {
      return {
        title: `${this.documentTitle} ${this.isBacklinkPage()?" (역링크)":""} - ${this.$accessor.title}`,
      }
    }
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
        }
  
        nav {
          position: relative;
          top: 6px;
  
          ul {
            li {
              list-style: none;
              float:left;
  
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