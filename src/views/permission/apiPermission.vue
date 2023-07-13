<template>
  <div class="app-container">
<!--    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.importance"
        :placeholder="$t('table.importance')"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
    </div>-->

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
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.name')" width="182px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.type')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Url" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.loginAccess')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.loginAccess | statusFilter">
            {{ row.loginAccess }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.publicAccess')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.publicAccess | statusFilter">
            {{ row.publicAccess }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ new Date(row.createDate) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.lastUpdatedDate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ new Date(row.lastUpdatedDate) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleAuthority(row)">
            {{ $t('table.authorize') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <el-dialog title="接口授权" :visible.sync="dialogFormVisible">
      <dnd-list :list1="apiRoles" :list2="noPermissionRoles" list1-title="已授权角色" list2-title="未授权角色" />
      <div>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple" style="overflow: hidden">
            <pagination
              layout='total, sizes, prev, pager, next'
              :total="apiRolesTotal"
              :page.sync="apiRolesQuery.current"
              :limit.sync="apiRolesQuery.size"
              @pagination="selectRolesHasPermission"
            />
          </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light" style="overflow: hidden">
            <pagination
              layout='total, sizes, prev, pager, next'
              :total="noPermissionRolesTotal"
              :page.sync="noPermissionRolesQuery.current"
              :limit.sync="noPermissionRolesQuery.size"
              @pagination="selectRolesWithoutPermission"
            />
          </div>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleUpdateAuthority()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getApis, updateAuthority } from '@/api/permission'
import DndList from '@/components/DndList'
import { selectRolesHasPermission, selectRolesWithoutPermission } from '@/api/role' // secondary package based on el-pagination


export default {
  name: 'ComplexTable',
  components: { DndList, Pagination },
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
      apiRolesTotal: 0,
      noPermissionRolesTotal: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 20,
        importance: undefined,
        title: undefined,
        id: undefined,
        type: undefined,
        sort: '+id'
      },
      apiRolesQuery: {
        current: 1,
        size: 20,
        id: undefined
      },
      noPermissionRolesQuery: {
        current: 1,
        size: 20,
        id: undefined
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      downloadLoading: false,
      apiRoles: [],
      temp: {
        permission: undefined,
        assignedRoles: undefined
      },
      noPermissionRoles: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getApis(this.listQuery).then(response => {
        this.list = response.records
        this.total = response.total
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    selectRolesHasPermission: function() {
      selectRolesHasPermission(this.apiRolesQuery).then(response => {
        this.apiRoles = response.records
        this.apiRolesTotal = response.total
      })
    },
    selectRolesWithoutPermission: function() {
      selectRolesWithoutPermission(this.noPermissionRolesQuery).then(response => {
        this.noPermissionRoles = response.records
        this.noPermissionRolesTotal = response.total
      })
    },
    handleAuthority(row) {
      this.listLoading = true
      this.temp.permission = Object.assign({}, row)
      this.apiRolesQuery.id = row.id
      this.noPermissionRolesQuery.id = row.id
      this.dialogFormVisible = true
      this.selectRolesHasPermission(this.apiRolesQuery)
      this.selectRolesWithoutPermission(this.noPermissionRolesQuery)
      this.listLoading = false
    },
    handleUpdateAuthority() {
      this.listLoading = true
      this.temp.assignedRoles = this.apiRoles
      updateAuthority(this.temp).then(() => {
        this.listLoading = false
        this.dialogFormVisible = false
      })
      this.listLoading = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
