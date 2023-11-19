<template>
  <div class="app-container documentation-container">
    <example v-if="getUser.username==='admin'"/>
    <div v-else>
      这里什么都没有...
    </div>
  </div>
</template>

<script>
import example from '@/views/shop/components/example.vue'

export default {
  name: 'GoodsTest',
  components: { example },
  data() {
    return {
      articleList: []
    }
  },
  computed: {
    getUser() {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn-style {
    font-size: 20px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
  }

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
