<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <!--        <CommentDropdown v-model="postForm.commentDisabled" />
                <PlatformDropdown v-model="postForm.platforms" />
                <SourceUrlDropdown v-model="postForm.sourceUri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Draft
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!--          <Warning />-->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <!--                <el-col :span="8">
                                  <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                                    <el-select
                                      v-model="postForm.author"
                                      :remote-method="getRemoteUserList"
                                      filterable
                                      default-first-option
                                      remote
                                      placeholder="Search user"
                                    >
                                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                                    </el-select>
                                  </el-form-item>
                                </el-col>-->

                <el-col :span="10">
                  <!--                  <el-form-item label-width="120px" label="Publish Time:" class="postInfo-container-item">
                                      <el-date-picker
                                        v-model="displayTime"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="Select date and time"
                                      />
                                    </el-form-item>-->
                </el-col>

                <el-col :span="6">
                  <!--                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                                      <el-rate
                                        v-model="postForm.importance"
                                        :max="3"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                                        :low-threshold="1"
                                        :high-threshold="3"
                                        style="display:inline-block"
                                      />
                                    </el-form-item>-->
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="描述:">
          <el-input
            v-model="postForm.description"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce v-if="editor==='Tinymce'" ref="editor" v-model="postForm.content" :height="400"/>
          <MarkdownEditor v-if="editor==='MarkdownEditor'" ref="editor" v-model="postForm.content" :height="'400px'" @uploadImageEvent="uploadImage" />
        </el-form-item>

        <el-form-item prop="img" style="margin-bottom: 30px;">
          <Upload v-model="postForm.img"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { createArticle, fetchArticle, updateArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { uploadImage } from '@/api/file'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  type: 'ARTICLE', // 类型
  content: '', // 文章内容
  description: '', // 文章摘要
  sourceUri: '', // 文章外链
  img: '', // 文章图片
  displayTime: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  commentDisabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { MarkdownEditor, Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      editor: 'MarkdownEditor',
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        img: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        sourceUri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.description.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.displayTime))
      },
      set(val) {
        this.postForm.displayTime = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.$nextTick(() => {
        this.fetchData(id)
      })
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response

        if (this.$refs['editor'] !== undefined) {
          this.$refs['editor'].setContent(this.postForm.content)
        }
        // just for test
        this.postForm.title = `   Article Id:${this.postForm.id}`
        this.postForm.description += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 'published'
          if (!this.isEdit) {
            createArticle(this.postForm).then((res) => {
              this.postForm.id = res.id
              this.$notify({
                title: '成功',
                message: '保存文章成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push('/example/edit/' + this.postForm.id)
            })
          } else {
            updateArticle(this.postForm).then((res) => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
            })
          }
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.postForm.status = 'draft'
      createArticle(this.postForm).then((res) => {
        this.postForm.id = res.id
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 1000
        })
      })
      console.log(this.postForm)
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },

    // Custom picture upload
    uploadImageBase64(file, callback) {
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        callback(target.result || '')
      }
      reader.readAsDataURL(file)
    },
    // Custom picture upload
    uploadImage(file, callback) {
      const forms = new FormData()
      const configs = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      forms.append('file', file)
      uploadImage(forms, configs).then(response => {
        callback(process.env.VUE_APP_FILE_BASE_API + '/' + response.fileKey)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
