<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column  :label="$t('table.quotaUsed')" width="210px" align="center">
        <template slot-scope="{row}">
          <span style="color:#3fb820;">{{ row.quotaUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.tokenUsed')" width="210px" align="center">
        <template slot-scope="{row}">
          <span style="color:#67bbff;">{{ row.tokenUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiCode')" min-width="150px">
        <template slot-scope="{row}">
          <el-tag>{{ row.apiCode | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ new Date(row.createDate) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/key-used'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { parseTime } from '../../utils' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'gpt-4', display_name: 'GPT-4' },
  { key: 'gpt-4-32k', display_name: 'GPT-4-32k' },
  { key: 'gpt-3.5-turbo', display_name: 'GPT-3.5-TURBO' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 20,
        apiKey: undefined,
        apiCode: undefined
      },
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    parseTime,
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.records
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }
  }
}
</script>
