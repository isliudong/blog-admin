<template>
  <div class="public-main">
    <keep-alive>
      <GoodsAll/>
    </keep-alive>
  </div>
</template>

<script>
import GoodsAll from '@/views/public/openai/components/tab/components/goods/GoodsAll.vue'

export default {
  name: 'publicMain',
  components: { GoodsAll },
  data() {
    return {
      activeName: 'all',
      createdTimes: 0
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
.public-main {
  height: 100vh;
  width: 100vw;
}
</style>
