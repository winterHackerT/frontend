<template>
  <header id="global-navigation-bar">
    <div class="wrap">
      <div class="left">
        <NuxtLink class="logo" to="/">
          <i class="bi bi-1-square"></i>
          {{ $accessor.title }}
        </NuxtLink>

        <nav>
          <ul>
            <li v-for="(item, index) in navItems" :key="index">
              <span
                @click="item.subItems ? toggle(index) : $router.push(item.link)"
              >
                <i class="bi" :class="item.icon"></i>
                <span class="text">{{ item.title }}</span>

                <i
                  v-if="item.subItems && !item.isSubVisible"
                  class="bi bi-caret-down-fill"
                ></i>
                <i
                  v-if="item.subItems && item.isSubVisible"
                  class="bi bi-caret-up-fill"
                ></i>
              </span>

              <div v-if="item.subItems && item.isSubVisible" class="sub">
                <li
                  v-for="subItem in item.subItems"
                  :key="subItem.title"
                  :class="{ divider: subItem.title == '-' }"
                >
                  <NuxtLink v-if="subItem.title != '-'" :to="subItem.link">
                    <i class="bi" :class="subItem.icon"></i>
                    {{ subItem.title }}
                  </NuxtLink>
                </li>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div class="right">
        <div id="search-bar">
          <a href="#" class="btn" @click="moveRandomDocument()"><i class="bi bi-shuffle"></i></a>

          <input
            id="search-input"
            v-model="searchInput"
            type="text"
            placeholder="Search"
            @keydown.enter="moveDocument(searchInput)"
          />

          <a href="#" class="btn" @click="fetchSearch()"><i class="bi bi-search"></i></a>
          <a href="#" class="btn" @click="moveDocument(searchInput)"><i class="bi bi-arrow-right"></i></a>

          <div v-if="searchInput.length > 0 && searchResult.length > 0" class="sub search-result">
            <li v-for="item, index in searchResult" :key="index" @click="clearSearchResult()">
              <NuxtLink :to="`/w/${item}`">{{ item }}</NuxtLink>
            </li>
          </div>
        </div>

        <div to="#" class="user-btn" @click.self="toggleUser()">
          <i class="bi bi-person-fill" @click.self="toggleUser()"></i>

          <div v-if="isUserVisble" class="sub">
            <div class="info">
              <p class="addr"><b>{{ addr }}</b></p>
              <p>Please login!</p>
            </div>

            <li class="divider"></li>
            <li><NuxtLink to="#">??????</NuxtLink></li>
            <li><a href="#" @click="toggleDarkmode()">{{ isDarkmode ? '????????? ?????????' : '?????? ?????????' }}</a></li>
            <li class="divider"></li>
            <li><NuxtLink to="#">??? ?????? ?????? ??????</NuxtLink></li>
            <li><NuxtLink to="#">??? ?????? ?????? ??????</NuxtLink></li>
            <li class="divider"></li>
            <li><NuxtLink to="/member/login">?????????</NuxtLink></li>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      addr: '127.0.0.1',
      searchInput: '',
      searchResult: [] as string[],
      navItems: [
        {
          title: '?????? ??????',
          link: '/recentChanges',
          icon: 'bi-compass-fill',
        },
        {
          title: '?????? ??????',
          link: '#',
          icon: 'bi-chat-left-dots-fill',
        },
        {
          title: '?????? ??????',
          link: '#',
          icon: 'bi-box-seam-fill',
          subItems: [
            {
              title: '?????????',
              icon: 'bi-clipboard2-fill',
              link: '#',
            },
            {
              title: '-',
              icon: '',
              link: '#',
            },
            {
              title: '????????? ????????? ??????',
              icon: 'bi-info-circle-fill',
              link: '#',
            },
            {
              title: '????????? ??????',
              icon: 'bi-info-circle-fill',
              link: '#',
            },
            {
              title: '????????? ?????? ?????? ??????',
              icon: 'bi-question-circle-fill',
              link: '#',
            },
            {
              title: '????????? ??? ????????? ??????',
              icon: 'bi-pause-circle-fill',
              link: '#',
            },
            {
              title: '????????? ?????? ??????',
              icon: 'bi-pencil-fill',
              link: '#',
            },
            {
              title: '????????? ??? ??????',
              icon: 'bi-suit-heart-fill',
              link: '#',
            },
            {
              title: '?????? ??????',
              icon: 'bi-heartbreak-fill',
              link: '#',
            },
            {
              title: 'RandomPage',
              icon: 'bi-shuffle',
              link: '#',
            },
            {
              title: '?????? ?????????',
              icon: 'bi-cloud-arrow-up-fill',
              link: '#',
            },
            {
              title: '????????????',
              icon: 'bi-bookmark-fill',
              link: '/license',
            },
          ],
          isSubVisible: false,
        },
      ],
      isUserVisble: false,
    }
  },
  computed: {
    isDarkmode() {
      return this.$accessor.darkmode === 'true';
    }
  },
  watch: {
    searchInput() {
      this.fetchSearch();
    }
  },
  mounted() {
    this.fetchAddr();
  },
  methods: {
    fetchAddr() {
      axios
        .get(this.$accessor.api + '/addr')
        .then(response => {
          this.addr = response.data;
        });
    },
    fetchSearch() {
      if (this.searchInput === '') return;

      axios
        .get(this.$accessor.api + '/docs/search/' + this.searchInput)
        .then(response => {
          if (response.data.success) {
            this.searchResult = response.data.data;
          }
        });
    },
    clearSearchResult() {
      this.searchInput = '';
      this.searchResult = [];
    },
    moveDocument(title: string) {
      if (title === '') return;

      this.clearSearchResult();
      this.$router.push(`/w/${title}`);
    },
    async moveRandomDocument() {
      const response = await axios.get(this.$accessor.api + '/docs/random');

      if (response.data.success) {
        const data = response.data.data;
        this.moveDocument(data[0]);
      }
    },
    toggle(index: number) {
      const current = this.navItems[index].isSubVisible
      this.navItems[index].isSubVisible = !current
    },
    toggleUser() {
      this.isUserVisble = !this.isUserVisble
    },
    toggleDarkmode() {
      this.$accessor.setDarkmode(this.isDarkmode ? 'false' : 'true');
      window.location.reload();
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

#global-navigation-bar {
  width: 100%;
  height: 50px;
  position: sticky;

  background-color: $primary;
  color: white;

  font-size: 16px;

  z-index: 10;

  .wrap {
    width: 100%;
    max-width: $max-desktop-width;
    height: 100%;

    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > div {
      height: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .logo {
        font-weight: bold;
      }

      a {
        color: white;
        text-decoration: blink;
      }

      .sub {
        border: 1px solid $light-light;
        background-color: white;

        position: absolute;
        top: 100%;

        margin-top: 1px;
        margin-right: -10px;

        display: flex;
        flex-direction: column;

        cursor: default;

        * {
          color: $secondary;
        }

        > * {
          padding: 10px 25px;
        }

        li {
          height: fit-content;
          list-style: none;
          margin: 0;
          padding: 10px 25px;
          justify-content: flex-start;

          i {
            margin-right: 5px;
          }
        }

        li:hover {
          background-color: $light-light;
        }

        li.divider {
          height: 0;
          padding: 0;
          margin: 5px 0;

          border-top: 1px solid $light-light;
        }

        li.divider:hover {
          background-color: transparent;
        }
      }

      .sub::before {
        content: '';

        width: 0;
        height: 0;

        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;

        position: relative;
        left: 100%;
        bottom: 10px;
        margin-left: -30px;
      }

      .sub.search-result {
        width: 222px;
        margin-left: 38px;
        padding: 0 !important;
      }

      .sub.search-result::before {
        border: none;
      }

      nav {
        height: 100%;

        ul {
          height: 100%;

          li {
            height: 50px;

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            float: left;
            list-style: none;
            padding: 0 10px;
            margin-left: 10px;

            span {
              cursor: pointer;

              i {
                padding-right: 5px;
              }
            }
          }

          li:hover {
            background-color: $light-primary;
          }
        }
      }
    }

    #search-bar {
      height: 100%;

      display: flex;
      flex-direction: row;

      > * {
        display: flex;
        padding: 0 10px;
      }

      #search-input {
        width: 200px;
      }

      .btn {
        width: fit-content;
        height: 48px;

        align-items: center;
        justify-content: center;
      }
    }

    .left {
      margin-left: 20px;
    }

    .right {
      margin-right: 20px;
      .user-btn {
        width: fit-content;
        height: 100%;

        margin-left: 10px;
        padding: 0 15px;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        cursor: pointer;

        i {
          font-size: 20px;
        }

        .sub {
          .info {
            text-align: right;

            .addr {
              font-size: 18px;
            }
          }
        }
      }

      .user-btn:hover {
        background-color: $light-primary;
      }
    }
  }
}

@media screen and (max-width: $max-table-width) {
  #global-navigation-bar {
    margin-bottom: 50px;

    .wrap {
      width: 100%;

      flex-direction: column;
      align-items: flex-start;

      .left {
        margin-left: 20px;
      }

      .right {
        width: 100%;

        #search-bar {
          width: 100%;

          #search-input {
            width: 100%;
          }
        }

        .user-btn {
          position: absolute;
          top: 0;
          right: 10px;

          .sub {
            width: 180px;
          }
        }
        
        #search-bar {
          .search-result {
            width: fit-content;
            margin-top: 50px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: $max-mobile-width) {
  #global-navigation-bar {
    nav .text {
      display: none;
    }
  }
}
</style>
