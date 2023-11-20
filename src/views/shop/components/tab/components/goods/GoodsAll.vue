<template>
  <div class="app-container good-container">
    <div class="pan-btn good-card blue-btn document-btn-style" target="_blank" >
      <div class="good-title">GPT-3.5-turbo</div>
      <div class="good-desc">响应迅速</div>
      <div class="good-desc">性价比高</div>
      <div class="good-price">0.00022$/1000 token</div>
    </div>
    <div class="pan-btn good-card light-blue-btn document-btn-style" target="_blank" >
      <div class="good-title">GPT-4</div>
      <div class="good-desc">逻辑推理能力强</div>
      <div class="good-desc">水桶旗舰</div>
      <div class="good-price">0.00250$/1000 token</div>

    </div>
    <div class="pan-btn good-card pink-btn document-btn-style" target="_blank" >
      <div class="good-title">GPT-4-32k</div>
      <div class="good-desc">逻辑推理能力很强</div>
      <div class="good-desc">脑容量出众</div>
      <div class="good-price">0.00290$/1000 token</div>

    </div>
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

.good-container {
  height: 60vh;
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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
  .good-card {
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    height: 420px;
    width: 250px;
    line-height: 32px;
    padding: 0 15px;
    text-align: center;
    #transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s;
    white-space: nowrap;
  }

  .good-card:hover {
    transform: scale(1.05);   /* 放大容器 */
    box-shadow: 0px 0px 30px rgba(0,0,0,0.4);   /* 添加阴影 */
  }
  .good-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    margin-top: 20px;
  }
  .good-desc {
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
    margin-top: 80px;
  }
  .good-price {
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    margin-top: 60px;
  }
}
</style>
