<template>
    <div id="document-view-page">
      <document-title
        :document-title="documentTitle"
        page-name="문서 역사"
      >
  
        <li><NuxtLink to="#" class="btn">편집</NuxtLink></li>
        <li>
          <NuxtLink :to="`/backlink/${documentTitle}`" class="btn">역링크</NuxtLink>
        </li>
      </document-title>

      <controller />
        <ul>
            <li v-for="(item, index) in documentItems" :key="index">
              {{item.editDateTime}}(<NuxtLink to="#">보기</NuxtLink>|<NuxtLink :to="`/raw/${documentTitle}?rev=${item.editVersion}`">RAW</NuxtLink>|<NuxtLink to="#">Blame</NuxtLink>|<NuxtLink to="#">이 리비전으로 되돌리기</NuxtLink>|<NuxtLink to="#">비교</NuxtLink>) <input type="radio"> <input type="radio"/> r{{ item.editVersion }} (+1) <NuxtLink to="">{{ item.editor }}</Nuxtlink> ()
            </li>
        </ul>
      <controller />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    setup() {
      return {}
    },
    data() {
      return {
        documentTitle: this.$route.params.slug as any,
        documentItems: [{
          editDateTime: '2021-08-01 00:00:00', 
          editVersion: 1,
          editor: 'admin'
        },{
          editDateTime: '2021-08-01 00:00:00', 
          editVersion: 2,
          editor: 'test'
        },{
          editDateTime: '2021-08-01 00:00:00', 
          editVersion: 3,
          editor: 'test1'
        }]
      }
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
  