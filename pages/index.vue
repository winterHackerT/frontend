<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  },
  created() {
    this.$router.push(`/w/${this.$accessor.title}:대문`);
  }
})
</script>

<style lang="scss" scoped>

</style>