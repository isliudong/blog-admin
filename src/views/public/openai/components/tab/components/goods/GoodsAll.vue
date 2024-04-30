<template>
  <div class="product-background">
    <div class="good-container">
      <div class="pan-btn good-card blue-btn document-btn-style" target="_blank" >
        <div class="good-title">GPT-3.5-turbo</div>
        <div class="good-desc">响应迅速</div>
        <div class="good-desc">性价比高</div>
        <div class="good-price">提示$0.0018/1000 token<br>完成$0.0024/1000 token</div>
      </div>
      <div class="pan-btn good-card light-blue-btn document-btn-style" target="_blank" >
        <div class="good-title">GPT-4</div>
        <div class="good-desc">逻辑推理能力强</div>
        <div class="good-desc">综合模型</div>
        <div class="good-price">提示$0.036/1000 token<br>完成$0.072/1000 token</div>
      </div>
      <div class="pan-btn good-card pink-btn document-btn-style" target="_blank" >
        <div class="good-title">GPT-4-32k</div>
        <div class="good-desc">逻辑推理能力很强</div>
        <div class="good-desc">脑容量出众</div>
        <div class="good-price">提示$0.072/1000 token<br>完成$0.144/1000 token</div>
      </div>
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

// 定义动画
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
// 商品容器样式
.product-background {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(45deg, #ffafbd, #ffc3a0, #2193b0, #6dd5ed); // 线性渐变背景
  background-size: 400% 400%; // 背景大小
  animation: gradientBackground 15s ease infinite; // 应用动画
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); // 盒子阴影，增加立体感
  overflow: hidden; // 防止内容溢出
  transition: transform 0.3s ease-in-out; // 鼠标悬停时的变换效果
}

// 商品标题
.product-title {
  font-size: 24px;
  color: white;
  font-weight: bold;
}

// 商品描述
.product-description {
  font-size: 16px;
  color: white;
  margin-top: 10px;
}
</style>
