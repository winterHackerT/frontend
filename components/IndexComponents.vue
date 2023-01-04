<template>
    <div id="index">
        <div class="indexTitle">목차</div>
        <div class="indexList">
            <span class="indexItem" v-for="item, index in indexList" :key="index">
                    <nuxt-link to="#">{{index+1}}</nuxt-link>. {{item.title}}
                    <div v-if="item.subIndex">
                        <span class="indexItem" v-for="subItem, subIndex in item.subIndex" :key="subIndex">
                            <nuxt-link to="#">{{index+1}}.{{subIndex+1}}</nuxt-link>. {{subItem.title}}
                            <div v-if="subItem.subIndex">
                                <span class="indexItem" v-for="subSubItem, subSubIndex in subItem.subIndex" :key="subSubIndex">
                                    <nuxt-link to="#">{{index+1}}.{{subIndex+1}}.{{subSubIndex+1}}</nuxt-link>. {{subSubItem.title}}
                                </span>
                            </div>
                        </span>
                    </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent
    } from 'vue'
    export default defineComponent({
        setup() {
            return {}
        },
        data() {
            return {
                indexList: [{
                        title: "개요"
                    },
                    {
                        title: "목적"
                    },
                    {
                        title: "진행",
                        subIndex: [{
                            title: "개요"
                        }, {
                            title: "목적"
                        }, {
                            title: "진행",
                            subIndex: [{
                                title: "개요"
                            }, {
                                title: "목적"
                            }, {
                                title: "진행"
                            }]
                        }]
                    },
                ]
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import '@/assets/css/variable.scss';
    #index {
        border: 1px solid #ccc;
        display: inline-block;
        margin-left: 5px;
        padding: 12px 20px 18px 0;
        .indexTitle {
            font-size: 1.25em;
            margin-left: 14px;
        }
        .indexList {
            margin-top: 12px;
            padding-left: 20px;

        }
        .indexItem {
            display: block;
            margin-left: 14px;
            font-size: 1em;
            margin-top: 10px;
            a {
                color: $light-primary;
                text-decoration: blink;
            }
            a:hover {
                text-decoration: underline;
            }
        }
    }
</style>