<template>
  <div class="write-note">
     <Input v-model="title" placeholder="无标题文章" style="width: 300px"></Input>
    <mavon-editor v-model="note" @save="saveNote"/>
  </div>
</template>

<script>
import * as resApi from '@/service/fetchData'
import utils_ from '@/tool/Utils'
export default {
  name: 'Note',
  data () {
    return {
      title: '',
      note: '',
      userId: ''
    }
  },
  mounted () {
    this.userId = window.sessionStorage.getItem('userId')
  },
  methods: {
    // 保存方法
    async saveNote (value, render) {
      let imgStr = render.match(/<img[^>]+>/g)
      let relatedImg = ''
      let data = render
      let pattern = new RegExp('<p.*?>(.*?)</p>', 'i')
      let thumbnailArticle = data.match(pattern)[1]
      if (imgStr) {
        relatedImg = imgStr[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1]
        imgStr.forEach((item, index) => {
          if (index === 0) {
            thumbnailArticle = data.substring(3, data.indexOf(item))
          }
          data = data.replace(item, '')
        })
      }
      let res = await resApi.publishBlog(this.userId, this.title, render, relatedImg, thumbnailArticle, utils_.getCurrentTime())
      if (res) {
        if (res.code === 200) {
          this.$router.push({name: 'BlogList'})
        } else {
          this.$Message.error(res.message)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
