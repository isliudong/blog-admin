<template>
  <div class="app-container documentation-container">
    <a class="pan-btn blue-btn document-btn-style" target="_blank" >GPT-35-turbo</a>
    <a class="pan-btn light-blue-btn document-btn-style" target="_blank" >GPT-4</a>
    <a class="pan-btn pink-btn document-btn-style" target="_blank" >GPT-4-32k</a>
  </div>
</template>

<script>

export default {
  name: 'GoodsAll',
  components: {},
  data() {
    return {
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
      ]
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
