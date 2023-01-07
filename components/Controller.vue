<template>
  <div class="controller">
    <button class="btn"><i class="bi bi-chevron-left"></i>Prev</button>
    <button class="btn">Next<i class="bi bi-chevron-right"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    prev: {
      type: String,
      default: ''
    },
    next: {
      type: String,
      default: ''
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';

.controller {
  .btn {
    float: left;
    margin: 0;
    padding: 7px;
    color: $input-secondary;
  }
}
</style>