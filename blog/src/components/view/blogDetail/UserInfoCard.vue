<template>
  <div class="user-info-card">
    <router-link to="/blogDetail" class="banner">
      <img v-lazy="userInfo.avatar" />
    </router-link>
    <div class="info">
      <router-link to="/blogDetail" class="name">
        {{userInfo.userName}}
      </router-link>
      <Icon type="female" v-if="userInfo.sex===1"></Icon>
      <Icon type="male" v-else></Icon>
      <div class="meta">
        <span>{{meta.wordCount}}万字 ·</span>
        <span>{{meta.pageview}}万阅读 ·</span>
        <span>{{meta.attentionCount}}人关注</span>
      </div>
      <Button type="primary" shape="circle" icon="android-add">加入圈子</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoCard',
  data () {
    return {
      userInfo: {
        avatar: 'http://upload.jianshu.io/book/image/57592c95-2d41-4aea-a3f2-5ae09df626ef.png',
        userName: '我的名字',
        sex: 0 // 1 代表男，0 代表女
      },
      meta: {
        wordCount: 100,
        pageview: 100,
        attentionCount: 1000
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-info-card {
  padding: 20px;
  background-color: hsla(0,0%,71%,.1);
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 12px;
  position: relative;
  height: 147px;
}
.user-info-card .banner {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1;
  width: 80px;
  height: 107px;
  border-radius: 4px;
  overflow: hidden;
}
.user-info-card .banner img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.user-info-card .info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 100px;
}
.user-info-card .info .ivu-btn.ivu-btn-primary {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #fff;
  background-color: #3db922;
  border-color: #3db922;
  font-size: 16px;
  font-weight: 400;
}
.user-info-card .info .ivu-icon {
  font-size: 15px;
  position: absolute;
  top: 30px;
  left: 204px;
}
.user-info-card .info .ivu-icon.ivu-icon-female {
  color: #ea6f5a;
}
.user-info-card .info .ivu-icon.ivu-icon-male {
  color: #3194d0;
}
.user-info-card .info .name {
  text-align: left;
  color: #333;
  font-size: 17px;
  line-height: 1.8;
  margin: 3px 0 5px;
  display: block;
}
.user-info-card .info .meta {
  color: #969696;
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
}
</style>
