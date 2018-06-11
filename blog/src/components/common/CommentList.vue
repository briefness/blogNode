<template>
  <div class="comment-list">
    <div class="top-title">
      <div class="pull-left">
        <span>{{commentCount}}条评论</span>
        <a class="author-only" @click="justLookAuthor">只看作者</a>
      </div>
      <div class="pull-right">
        <a @click="timeSequence">按时间正序</a>
        <a @click="timeInverted">按时间倒序</a>
      </div>
    </div>
    <div class="comment">
      <div class="author">
        <div class="v-tooltip-container" style="z-index: 0;">
          <Avatar class="avatar" :src="authorInfo.avatar" />
        </div>
        <div class="info">
          <span class="name">{{authorInfo.userName}}</span>
          <div class="meta">
            <span>{{meta.publishTime}}</span>
          </div>
        </div>
      </div>
      <div class="comment-wrap">
        <p>{{meta.comment}}</p>
        <div class="tool-group">
          <a :class="{'like-button' : isLike, 'like-button liked': !isLike}" @click="likeComment">
            <Icon type="ios-lightbulb-outline" v-if="isLike" class="afflatus"></Icon>
            <Icon type="ios-lightbulb" v-if="!isLike" class="afflatus my-afflatus"></Icon>
            <span>{{meta.like}}人赞</span>
          </a>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  data () {
    return {
      isLike: true,
      commentCount: 63,
      authorInfo: {
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        userName: '用户名'
      },
      meta: {
        floor: 17,
        publishTime: '2018.05.10 19:25',
        comment: '我是一名新晋医生，偶尔也会吐槽基层医生工资太低，同学刚毕业轻松翻我好几个倍，总建议让我换工作',
        like: 63
      }
    }
  },
  mounted () {},
  methods: {
    // 只看作者
    justLookAuthor () {},
    // 按时间正序
    timeSequence () {},
    // 按时间倒序
    timeInverted () {},
    // 评论点赞
    likeComment () {
      this.isLike = !this.isLike
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~assets/less/common.less';
.comment-list .top-title {
  padding-bottom: 20px;
  height: 50px;
  font-size: 17px;
  font-weight: 700;
  border-bottom: 1px solid #f0f0f0;
}
.comment-list .top-title span {
  vertical-align: middle;
}
.comment-list .top-title .author-only {
  margin-left: 10px;
  padding: 4px 8px;
  font-size: 12px;
  color: #969696;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
}
.comment-list .top-title .pull-right a {
  margin-left: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #969696;
  display: inline-block;
}
/* 评论区 */
.comment-list .comment {
  padding: 20px 0 30px;
  border-bottom: 1px solid #f0f0f0;
}
.comment-list .comment .author {
  margin-bottom: 15px;
  text-align: left;
}
.comment-list .comment .author .v-tooltip-container {
  display: inline-block;
  position: relative;
}
.comment-list .comment .author .v-tooltip-container .avatar {
  margin-right: 5px;
  width: 38px;
  height: 38px;
  vertical-align: middle;
  display: inline-block;
}
.comment-list .comment .author .info {
  display: inline-block;
  vertical-align: middle;
}
.comment-list .comment .author .info .name {
  text-align: left;
  font-size: 15px;
  color: #333;
  display: inline-block;
  width: 100%;
}
.comment-list .comment .author .info .meta {
  font-size: 12px;
  color: #969696;
}
.comment-list .comment .author .info .meta span {
  margin-right: 6px;
}
.comment-list .comment .comment-wrap p {
  margin: 10px 0;
  line-height: 1.5;
  font-size: 16px;
  word-break: break-word!important;
}
.comment-list .comment .tool-group {
  text-align: left;
}
.comment-list .comment .tool-group a {
  margin-right: 10px;
  font-size: 0;
  color: #969696;
  display: inline-block;
}
.comment-list .comment .like-button {
  position: relative;
  padding-left: 23px;
}
.comment-list .comment .like-button span:hover {
  color: #333;
}
.comment-list .comment .like-button span {
  vertical-align: middle;
  font-size: 14px;
}
.comment-list .comment .like-button .afflatus {
  position: absolute;
  left: 3px;
  top: 0px;
  font-size: 20px;
  color: #969696;
}
.comment-list .comment .like-button .afflatus.my-afflatus {
  color: @main_color;
}
.comment-list .comment .like-button.liked {
  color: #333;
}
</style>
