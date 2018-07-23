<template>
  <div class="blog-detail-info">
    <div class="blog-info">
      <p class="title">{{meta.title}}</p>
      <div class="author">
        <img v-lazy="authorInfo.avatar" />
        <div class="info">
          <span class="name">{{authorInfo.name}}</span>
          <Button type="primary" shape="circle" size="small" @click="addCircle">
            <Icon type="android-add"></Icon>
            加入圈子
          </Button>
          <div class="meta">
            <span>{{meta.publishTime}}</span>
            <span>字数 {{meta.wordage}}</span>
            <span>阅读 {{meta.viewsCount}}</span>
            <span>评论 {{meta.commentsCount}}</span>
            <span>喜欢 {{meta.likesCount}}</span>
          </div>
        </div>
      </div>
      <div class="show-content" v-html="blogContentHtml"></div>
    </div>
    <div class="support-author">
      <p>你来，已是清风拂面</p>
      <!-- <Button type="primary" @click="supportAuthor">赞赏支持</Button> -->
    </div>
    <UserInfoCard :authorInfo="authorInfo" @addCircle="addCircle"></UserInfoCard>
    <div class="meta-bottom">
      <div :class="{'like' : isLike, 'like liked': !isLike}">
        <div class="btn-like" @click="likeThisArticle">
          <Icon v-if="isLike" type="ios-heart-outline" class="heart"></Icon>
          <Icon v-if="!isLike" type="ios-heart"  class="my-heart"></Icon>
          <a>喜欢</a>
        </div>
        <div class="modal-wrap">
          <a>{{meta.likes}}</a>
        </div>
      </div>
    </div>
    <CommentInput :articleId="articleId" :authorInfo="authorInfo" @getBlogCommentList="getBlogCommentList"></CommentInput>
    <CommentList :commentList="commentList"></CommentList>
  </div>
</template>

<script>
import * as resApi from '@/service/fetchData'
import UserInfoCard from './UserInfoCard'
import CommentInput from '@/components/common/CommentInput'
import CommentList from '@/components/common/CommentList'
export default {
  name: 'BlogDetail',
  components: {
    UserInfoCard,
    CommentInput,
    CommentList
  },
  data () {
    return {
      articleId: '',
      isLike: true,
      authorInfo: {
        userId: '',
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        name: '我的名字',
        sex: 0
      },
      meta: {
        title: '无标题文章',
        publishTime: '2018.05.12 08:22',
        wordage: 1000,
        viewsCount: 1000,
        commentsCount: 1000,
        likesCount: 1000,
        likes: 419
      },
      commentList: [],
      blogContentHtml: '<p>我都是金佛山的附件soID金佛山的</p><img src="//upload-images.jianshu.io/upload_images/9215795-4a96efa0165df0bc.jpg" />'
    }
  },
  mounted () {
    this.articleId = this.$route.query.articleId
    this.authorInfo.userId = window.sessionStorage.getItem('userId')
    this.getDetailBlog()
    this.getBlogCommentList()
  },
  methods: {
    // 获取博客详情信息
    async getDetailBlog () {
      let res = await resApi.getBlogInfo(this.articleId)
      if (res) {
        this.blogContentHtml = res.data.blogContentHtml
        this.meta.title = res.data.title
        this.meta.publishTime = res.data.publishTime
        this.meta.likes = res.data.likes
        this.authorInfo.avatar = res.data.avatar
        this.authorInfo.name = res.data.userName
        this.authorInfo.sex = res.data.sex
      }
    },
    // 获取博客评论列表
    async getBlogCommentList () {
      let res = await resApi.getBlogCommentList(this.articleId)
      if (res && res.data.length > 0) {
        this.commentList = res.data
      }
    },
    // 支持作者
    // supportAuthor () {},
    // 喜欢这篇文章
    likeThisArticle () {
      this.isLike = !this.isLike
    },
    // 加入圈子，相当于加关注
    addCircle () {
      this.$Message.info('暂不提供此功能')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '~assets/less/common.less';

.blog-detail-info {
  margin: 0 auto;
  width: 40%;
}
.blog-detail-info .show-content {
  font-size: 16px;
  width: 100%;
}
.blog-detail-info .show-content img {
  width: 110%!important;
  margin-left: -5%;
}
.blog-detail-info .title {
  margin-top: 20px;
  font-size: 34px;
  font-weight: 700;
}
.blog-detail-info .author {
  margin: 30px 0 40px;
  text-align: left;
}
.blog-detail-info .author img {
  width: 48px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.blog-detail-info .author .info {
  vertical-align: middle;
  display: inline-block;
  margin-left: 8px;
}
.blog-detail-info .author .info .name {
  font-size: 16px;
}
.blog-detail-info .author .info .meta {
  margin-top: 5px;
  font-size: 12px;
  color: #969696;
}
.blog-detail-info .ivu-btn-primary {
  background-color: #42c02e;
  border-color: #42c02e;
}
/* 支持作者 */
.blog-detail-info .support-author {
  min-height: 144px;
  margin-top: 20px;
  padding: 20px 0;
  text-align: center;
}
.blog-detail-info .support-author p {
  padding: 0 30px;
  margin-bottom: 20px;
  min-height: 24px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: #969696;
}
.blog-detail-info .support-author .ivu-btn-primary {
  margin-bottom: 20px;
  padding: 8px 25px;
  font-size: 16px;
  background-color: @main_color;
  border-radius: 20px;
  border-color: @main_color;
}

/* 喜欢按钮 */
.blog-detail-info .meta-bottom {
  margin-top: 40px;
  margin-bottom: 80px;
}
.blog-detail-info .meta-bottom .like {
  position: relative;
  padding: 13px 0 15px 0;
  font-size: 0;
  border: 1px solid @main_color;
  border-radius: 40px;
  width: 185px;
  height: 57px;
  cursor: pointer;
}
.blog-detail-info .meta-bottom .liked {
  position: relative;
  padding: 13px 0 15px 0;
  font-size: 0;
  background-color: @main_color;
  border: 1px solid @main_color;
  border-radius: 40px;
  width: 185px;
  height: 57px;
  cursor: pointer;
}
.blog-detail-info .meta-bottom .liked.like a {
  color: #FFF!important;
}
.blog-detail-info .meta-bottom .like .btn-like {
  display: inline-block;
  font-size: 19px;
}
.blog-detail-info .meta-bottom .like .btn-like .heart {
  position: absolute;
  left: 17px;
  top: 13px;
  color: @main_color;
  font-size: 30px;
}
.blog-detail-info .meta-bottom .like .btn-like .my-heart {
  position: absolute;
  left: 17px;
  top: 13px;
  color: #FFF;
  font-size: 30px;
}

.blog-detail-info .meta-bottom .like.liked .btn-like:before {
  background-position: right;
}
.blog-detail-info .meta-bottom .like .btn-like a {
  position: relative;
  padding: 18px 30px 18px 54px;
  color: @main_color;
}
.blog-detail-info .meta-bottom .like .modal-wrap {
  font-size: 18px;
  border-left: 1px solid @main_color;
  display: inline-block;
  margin-left: -15px;
}
.blog-detail-info .meta-bottom .like.liked .modal-wrap {
  border-left: 1px solid #FFF;
}
.blog-detail-info .meta-bottom .like .modal-wrap a {
  color: @main_color;
  padding: 18px 26px 18px 18px;
}
</style>
