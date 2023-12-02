<template>
  <div class="app-container documentation-container">
    <div class="pan-btn blue-btn document-btn-style" target="_blank" >GPT-3.5-turbo</div>
  </div>
</template>

<script>

export default {
  name: 'GoodsThree',
  components: {},
  data() {
    return {
      articleList: []
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
