<template>
  <div class="tab-container">
    <el-tag style="margin-left: 0px">GPT4 GPT3.5</el-tag>
    <el-tag style="margin-left: 30px">ApiKey</el-tag>
    <el-tag style="margin-left: 30px">ChatGPT</el-tag>
    <el-tag style="margin-left: 30px">Azure</el-tag>
    <el-alert :closable="false" style="width:210px;display:inline-block;vertical-align: middle;margin-left:30px;" title="无需代理，国内可直接访问" type="success" />
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/tab/components/TabPane'

export default {
  name: 'Tab',
  components: { TabPane },
  data() {
    return {
      tabMapOptions: [
        { label: '全部', key: 'all' },
        { label: 'GPT-3.5', key: '3.5' },
        { label: 'GPT-4', key: '4' },
        { label: 'test', key: 'test' }
      ],
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
  .tab-container {
    margin: 30px;
  }
</style>
