<template>
  <div id="layout">
    <GlobalNavigationBar />

    <main>
      <content>
        <Nuxt />
      </content>

      <aside>
        <ListBox title="최근 변경" :items="recentChanges" />
        <ListBox title="최근 게시물" :items="recentPosts" />
      </aside>
    </main>

    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {};
    },
    data() {
        return {
            recentChanges: [
                {
                    title: "test test test test test test1",
                    link: "#",
                    meta: "23:50",
                },
                {
                    title: "test test test test test test1",
                    link: "#",
                    meta: "23:50",
                },
                {
                    title: "test test test test test test1",
                    link: "#",
                    meta: "23:50",
                },
                {
                    title: "test test test test test test1",
                    link: "#",
                    meta: "23:50",
                },
            ],
            recentPosts: [
                {
                    title: "test test test test test test test test2",
                    link: "#",
                },
                {
                    title: "test test test test test test test test2",
                    link: "#",
                },
                {
                    title: "test test test test test test test test2",
                    link: "#",
                },
                {
                    title: "test test test test test test test test2",
                    link: "#",
                },
            ],
        };
    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#layout {
  min-height: 100vh;
  background-color: $background;

  main {
    width: 100%;
    max-width: $max-desktop-width;
    min-height: 100%;

    margin: 0 auto;

    display: flex;
    flex-direction: row;

    > * {
      border: 1px solid $light-light
    }

    content {
      width: 100%;
      min-height: 100vh;
      padding: 20px;
      
      background-color: white;
    }

    aside {
      width: 400px;

      margin-left: 15px;

      display: flex;
      flex-direction: column;
      
      .list-box {
        margin-top: 20px;
      }
    }
  }
}

@media screen and (max-width: $max-table-width) {
  #layout {
    main {
      flex-direction: column;

      aside {
        width: 100%;
        margin: 0;

        .list-box {
          margin: 0;
          border: none;
        }
      }
    }
  }
}
</style>