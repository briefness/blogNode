<template>
  <div class="my-home-page">
    <div class="user-info">
      <div class="avatar-content">
        <img v-lazy="authorInfo.avatar" class="avatar" />
        <div class="info">
          <p>{{authorInfo.attentionCount}}</p>
          <p class="text">圈子</p>
        </div>
        <div class="info">
          <p>{{authorInfo.fansCount}}</p>
          <p class="text">粉丝</p>
        </div>
      </div>
      <div class="info-content">
        <p class="name">{{authorInfo.name}}</p>
        <div class="info">
          <p>{{authorInfo.articleCount}}</p>
          <p class="text">文章</p>
        </div>
        <div class="info">
          <p>{{authorInfo.words}}</p>
          <p class="text">字数</p>
        </div>
      </div>
    </div>
    <div class="outer-container">
      <Tabs :animated="false" class="outer-container-tab">
        <TabPane label="文章" icon="document-text">
          <iPubishedBloglist :blogList="blogList"></iPubishedBloglist>
        </TabPane>
        <TabPane label="圈子" icon="disc">圈子</TabPane>
    </Tabs>
    </div>
  </div>
</template>

<script>
import * as resApi from '@/service/fetchData'
import iPubishedBloglist from './PubishedBloglist'
export default {
  name: 'HomePage',
  components: {
    iPubishedBloglist
  },
  data () {
    return {
      authorInfo: {
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        name: '我的名字',
        attentionCount: 0,
        fansCount: 0,
        words: 0,
        articleCount: 0
      },
      userId: '',
      blogList: []
    }
  },
  mounted () {
    this.userId = window.sessionStorage.getItem('userId')
    this.getUserInfo()
    this.getBlogList()
  },
  methods: {
    // 获取文章列表
    async getBlogList () {
      let res = await resApi.getBlogList(this.userId)
      if (res && res.data) {
        this.blogList = res.data
      } else {
        this.$Message.warning('暂无文章')
      }
    },
    async getUserInfo () {
      let userId = window.sessionStorage.getItem('userId')
      let res = await resApi.getUserInfo(userId)
      if (res && res.data) {
        this.authorInfo.avatar = res.data.avatar
        this.authorInfo.attentionCount = res.data.attentionCount
        this.authorInfo.fansCount = res.data.fansCount
        this.authorInfo.words = res.data.words
        this.authorInfo.articleCount = res.data.articleCount
        this.authorInfo.name = window.sessionStorage.getItem('username')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '~assets/less/common.less';
.my-home-page {
  margin-left: 25%;
  width: 40%;
}
.my-home-page .user-info {
  overflow: hidden;
  margin-bottom: 20px;
}
.my-home-page .user-info .avatar-content {
  float: left;
  width: 90px;
}
.my-home-page .user-info .info-content {
  float: left;
  margin-left: 30px;
}
.my-home-page .user-info .info-content .name {
  font-size: 21px;
  font-weight: 700;
  margin-top: 6px;
  margin-bottom: 10px;
}
.my-home-page .user-info .info-content .info {
  width: 50px;
}
.my-home-page .user-info .info-content .info:last-child {
  border-right: 0;
}
.my-home-page .user-info .info {
  width: 50%;
  float: left;
  border-right: 1px solid #F0F0F0;
}
.my-home-page .user-info .avatar-content .info:last-child {
  border-right: 0;
}
.my-home-page .user-info .info p {
  text-align: center;
}
.my-home-page .user-info .info p.text {
  color: #969696;
}
.my-home-page .user-info .avatar {
  width: 100%;
  height: 90px;
  border-radius: 50%;
  border: 1px solid #DDD;
}
.my-home-page .ivu-tabs-nav .ivu-tabs-tab {
  font-size: 15px;
}
.my-home-page .ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  font-size: 17px;
}
.my-home-page .ivu-tabs-nav .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused {
  color: @main_color;
}
.my-home-page .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: @main_color;
}
.my-home-page .ivu-tabs-ink-bar {
  background-color: @main_color;
}
</style>
