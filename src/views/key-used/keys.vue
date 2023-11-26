<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
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
      <el-table-column  :label="$t('table.apiKey')" min-width="410px" align="center">
        <template slot-scope="{row}">
          <span style="color:#2637dc;">{{ row.apiKey }}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.quota')" width="310px" align="center">
        <template slot-scope="{row}">
          <span style="color:#2637dc;">{{ row.quota }}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.quotaUsed')" width="310px" align="center">
        <template slot-scope="{row}">
          <span style="color:#3fb820;">{{ row.quotaUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="250px" align="center">
        <template slot-scope="{row}">
          <span>{{ new Date(row.createDate) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />

    <el-tag class="filter-item" style="margin-left: 10px;" type="success">
      地址(大陆直连):  https://panghucm.fun/openai/gpt
      <div style="color:#817cd2;margin-top: 10px; word-break-wrap: break-word; ">
        Curl 接口调用示例: <br>
        curl --location 'https://panghucm.fun/openai/gpt/v1/chat/completions' \<br>
        --header 'Content-Type: application/json' \<br>
        --header 'Authorization: Bearer nk-c0ef481bxmcxbxhsgs63537d17' \<br>
        --data '{<br>
        "messages": [<br>
        {<br>
        "role": "user",<br>
        "content": "ping"<br>
        }<br>
        ],<br>
        "model": "gpt-3.5-turbo",<br>
        "max_tokens": 800,<br>
        "temperature": 0.7,<br>
        "frequency_penalty": 0,<br>
        "presence_penalty": 0,<br>
        "top_p": 0.95,<br>
        "stream": false,<br>
        "stop": null<br>
        }'<br>
      </div>
    </el-tag>

    <el-dialog :title="'Import ApiKey'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'ApiKey'" prop="apiKey">
          <el-input v-model="temp.apiKey" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="createData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, importKeys } from '@/api/keys'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import { parseTime } from '../../utils'

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
      dialogFormVisible: false,
      temp: {
        apiKey: ''
      },
      rules: {
        apiKey: [{ required: true, message: 'apiKey is required', trigger: 'blur' }]
      },
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
        this.listLoading = false
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
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        apiKey: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const temps = []
          temps.push(this.temp)
          importKeys(temps).then((res) => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '导入成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
