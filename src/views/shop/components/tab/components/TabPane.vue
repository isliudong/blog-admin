<template>
  <div>
    <GoodsAll v-show="type==='all'"/>
    <GoodsThree v-show="type==='3.5'"/>
    <GoodsFour v-show="type==='4'"/>
    <GoodsTest v-show="type==='test'"/>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import GoodsAll from '@/views/shop/components/tab/components/goods/GoodsAll.vue'
import GoodsThree from '@/views/shop/components/tab/components/goods/GoodsThree.vue'
import GoodsFour from '@/views/shop/components/tab/components/goods/GoodsFour.vue'
import GoodsTest from '@/views/shop/components/tab/components/goods/GoodsTest.vue'

export default {
  name: 'TabPane',
  components: { GoodsAll, GoodsThree, GoodsFour, GoodsTest },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    //this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.records
        this.loading = false
      })
    }
  }
}
</script>

