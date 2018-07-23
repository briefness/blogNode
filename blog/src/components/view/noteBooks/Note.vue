<template>
  <div class="write-note">
    <Input v-model="title" placeholder="无标题文章" @keyup.native="limitImput" class="note-title"></Input>
    <mavon-editor ref="md" :ishljs="true" v-model="note" @imgAdd="imgAdd" @save="saveNote"/>
    <Button icon="paper-airplane" type="text" class="publish-btn" @click="publishBlog">发布</Button>
  </div>
</template>

<script>
import * as resApi from '@/service/fetchData'
import utils_ from '@/tool/Utils'
export default {
  name: 'Note',
  data () {
    return {
      title: '无标题文章',
      note: '',
      userId: '',
      render: '',
      relatedImg: '',
      thumbnailArticle: ''
    }
  },
  mounted () {
    this.userId = window.sessionStorage.getItem('userId')
  },
  methods: {
    limitImput () {
      this.title = this.title.replace(/[^\u4E00-\u9FA5-Za-z]/g, '')
    },
    // 绑定@imgAdd event
    async imgAdd (pos, file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.append('imgFile', file)
      let res = await resApi.uploadImg(formdata)
      // 替换掉当前的url
      this.$refs.md.$img2Url(pos, res.url)
    },
    // 发布文章
    async publishBlog () {
      // 调用保存
      document.getElementsByClassName('fa-mavon-floppy-o')[0].click()
      // 判断是否存在文章内容
      if (this.render) {
        let res = await resApi.publishBlog(this.userId, this.title, this.render, this.relatedImg, this.thumbnailArticle, utils_.getCurrentTime())
        if (res) {
          if (res.code === 2000000) {
            this.$router.push({name: 'BlogList'})
          } else {
            this.$Message.error(res.message)
          }
        }
      }
    },

    // 保存方法,保存发布文章的数据
    saveNote (value, render) {
      this.render = render
      if (render) {
        // 匹配所有的img标签，返回img标签数组
        let imgStr = render.match(/<img[^>]+>/g)
        // 清除换行符
        let data = render.replace(/[\r\n]/g, '')
        // 获取p标签里的内容
        let pattern = new RegExp('<p.*?>(.*?)<\/p>', 'i')
        this.thumbnailArticle = data.match(pattern)[1]
        if (imgStr) {
          this.relatedImg = imgStr[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]
          imgStr.forEach((item, index) => {
            if (index === 0) {
              this.thumbnailArticle = data.substring(3, data.indexOf(item))
            }
            // data = data.replace(item, ' ')
          })
        }
        if (!this.title) {
          this.title = '无标题文章'
        }
      } else {
        this.$Message.warning('内容不能为空')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.write-note {
  position: resolve;
}
.write-note .publish-btn {
  position: absolute;
  right: 6px;
  top: 142px;
  z-index: 9999;
  font-size: 16px;
}
.write-note .note-title {
  width: 100%;
}
.write-note .note-title.ivu-input-wrapper.ivu-input-type input.ivu-input {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
/* 工具栏 */
.write-note .v-note-wrapper .v-note-op .v-right-item {
  padding-right: 100px;
}
</style>
