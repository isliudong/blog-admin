<template>
  <div class="app-container documentation-container">
    <a class="pan-btn blue-btn document-btn-style" target="_blank" href="https://toonme.com/">卡通形象生成</a>
    <a class="pan-btn light-blue-btn document-btn-style" target="_blank" href="https://gceasy.ycrash.cn/">jvm内存分析</a>
    <a class="pan-btn pink-btn document-btn-style" target="_blank" href="https://wangchujiang.com/linux-command/">linux 命令查询</a>
    <a class="pan-btn green-btn document-btn-style" target="_blank" href="https://www.iconfont.cn/">阿里矢量图库</a>
    <dropdown-menu class="document-btn" :items="articleList" title="系列文章" />
    <a class="pan-btn yellow-btn document-btn-style" target="_blank" href="123">无</a>

  </div>

</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
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
