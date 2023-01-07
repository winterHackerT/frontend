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
import axios from 'axios';
import { defineComponent } from 'vue';

interface SideListItem {
  title: string,
  link: string,
  meta: string | null
};

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      recentChanges: [] as SideListItem[],
      recentPosts: [] as SideListItem[],
    }
  },
  created() {
    this.fetchRecentChanges();
  },
  methods: {
    fetchRecentChanges() {
      axios
        .get(this.$accessor.api + "/docs/recent")
        .then(response => {
          const data = response.data.data;
          
          this.recentChanges = [];

          for (const item of data) {
            this.recentChanges.push({
              title: item.title as string,
              link: `/w/${item.title}`,
              meta: item.datetime.substring(14, 19)
            });
          }
        })
        .catch(error => console.error(error));
    }
  }
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
      border: 1px solid $light-light;
    }

    content {
      width: 100%;
      min-height: 100vh;
      padding: 20px;

      background-color: white;

      position: relative;

      > div {
        display: flex;
        flex-direction: column;
      }
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

      content {
        width: auto;
      }

      aside {
        width: 100%;
        margin: 0;

        border-left: none;
        border-right: none;

        .list-box {
          margin: 0;
          border: none;
        }
      }
    }
  }
}
</style>
