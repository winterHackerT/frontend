<template>
    <div id="classificationBlock">
      분류:
      <ul>
          <li v-for="(classItem, index) in classificationList" :key="index"><NuxtLink :to="classItem.link">{{classItem.title}}</NuxtLink></li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
        
    },
    data() {
        return {
            classificationList: [
                {
                    title: '분류1',
                    link: '#',
                },
                {
                    title: '분류2',
                    link: '#',
                },
                {
                    title: '분류3',
                    link: '#',
                },
                {
                    title: '분류4',
                    link: '#',
                },
            ],
        }
    },
    setup() {
      return {}
    },
  })
  </script>
  
  <style lang="scss" scoped>
  #classificationBlock{
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: .9rem;
    margin-bottom: 1em;
    padding: 3px 3px 3px 5px;
    > ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: inline-flex;
        > li :after {
            display: inline-block;
            content: "|";
            padding-left: 5px;
            padding-right: 5px;
        }
    }
  }
  </style>
  