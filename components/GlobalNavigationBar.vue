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
          <NuxtLink to="#" class="btn"><i class="bi bi-shuffle"></i></NuxtLink>

          <input id="search-input" type="text" placeholder="Search" />

          <NuxtLink to="#" class="btn"><i class="bi bi-search"></i></NuxtLink>
          <NuxtLink to="#" class="btn"
            ><i class="bi bi-arrow-right"></i
          ></NuxtLink>
        </div>

        <div to="#" class="user-btn" @click.self="toggleUser()">
          <i class="bi bi-person-fill" @click.self="toggleUser()"></i>

          <div v-if="isUserVisble" class="sub">
            <div class="info">
              <p class="addr"><b>127.0.0.1</b></p>
              <p>Please login!</p>
            </div>

            <li class="divider"></li>
            <li><NuxtLink to="#">설정</NuxtLink></li>
            <li><NuxtLink to="#">다크 테마로</NuxtLink></li>
            <li class="divider"></li>
            <li><NuxtLink to="#">내 문서 기여 목록</NuxtLink></li>
            <li><NuxtLink to="#">내 토론 기여 목록</NuxtLink></li>
            <li class="divider"></li>
            <li><NuxtLink to="#">로그인</NuxtLink></li>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      navItems: [
        {
          title: '최근 변경',
          link: '/recentChanges',
          icon: 'bi-compass-fill',
        },
        {
          title: '최근 토론',
          link: '#',
          icon: 'bi-chat-left-dots-fill',
        },
        {
          title: '특수 기능',
          link: '#',
          icon: 'bi-box-seam-fill',
          subItems: [
            {
              title: '게시판',
              icon: 'bi-clipboard2-fill',
              link: '#',
            },
            {
              title: '-',
              icon: '',
              link: '#',
            },
            {
              title: '작성이 필요한 문서',
              icon: 'bi-info-circle-fill',
              link: '#',
            },
            {
              title: '고립된 문서',
              icon: 'bi-info-circle-fill',
              link: '#',
            },
            {
              title: '분류가 되지 않은 문서',
              icon: 'bi-question-circle-fill',
              link: '#',
            },
            {
              title: '편집된 지 오래된 문서',
              icon: 'bi-pause-circle-fill',
              link: '#',
            },
            {
              title: '내용이 잛은 문서',
              icon: 'bi-pencil-fill',
              link: '#',
            },
            {
              title: '내용이 긴 문서',
              icon: 'bi-suit-heart-fill',
              link: '#',
            },
            {
              title: '차단 내역',
              icon: 'bi-heartbreak-fill',
              link: '#',
            },
            {
              title: 'RandomPage',
              icon: 'bi-shuffle',
              link: '#',
            },
            {
              title: '파일 올리기',
              icon: 'bi-cloud-arrow-up-fill',
              link: '#',
            },
            {
              title: '라이선스',
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
  methods: {
    toggle(index: number) {
      const current = this.navItems[index].isSubVisible
      this.navItems[index].isSubVisible = !current
    },
    toggleUser() {
      this.isUserVisble = !this.isUserVisble
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
