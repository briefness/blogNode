<template>
  <div class="published-blog-list">
    <div class="blog-list" v-for="(blog, index) in blogList" :key="index">
      <div class="blog-list-content" :class="{ hasImg: blog.relatedImg , noImg: !blog.relatedImg }">
        <router-link :to="{'path': '/blogDetail', 'query': {'articleId': blog.articleId}}" class="blog-title">{{blog.publishTime}}</router-link>
        <p class="blog-content">
          {{blog.blogContent}}
        </p>
        <p class="meta">
          <router-link :to="{'path': '/blogDetail', 'query': {'articleId': blog.articleId}}"><Icon type="eye"></Icon>{{blog.pageView}}</router-link>
          <router-link :to="{'path': '/blogDetail', 'query': {'articleId': blog.articleId}}"><Icon type="chatbox"></Icon>{{blog.reply}}</router-link>
          <Icon type="heart"></Icon>{{blog.like}}
        </p>
      </div>
      <router-link :to="{'path': '/blogDetail', 'query': {'articleId': blog.articleId}}">
        <img v-lazy="blog.relatedImg" class="img-blur-done" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    blogList: {
      default: 'blogList'
    }
  },
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.published-blog-list .blog-list {
  position: relative;
}
.published-blog-list .blog-list .author {
  margin-bottom: 14px;
}
.published-blog-list .blog-list .author .avatar {
  margin-right: 5px;
}
.published-blog-list .blog-list .meta {
  color: #b4b4b4;
}
.published-blog-list .blog-list .meta a {
  margin-right: 10px;
  color: #b4b4b4;
}
.published-blog-list .blog-list .img-blur-done {
  position: absolute;
  top: 50%;
  margin-top: -68px;
  right: 0;
  width: 150px;
  height: 120px;
}
.published-blog-list .blog-list .blog-content {
  line-height:1.4em;
  /* 3 times the line-height to show 3 lines */
  height:4.2em;
  overflow:hidden;
  margin-bottom: 8px;
}
.published-blog-list .blog-list .blog-list-content:first-child {
  border-bottom: 1px solid #F0F0F0;
}
.published-blog-list .blog-list-content.hasImg {
  padding-right: 160px;
}
.published-blog-list .blog-list-content.noImg {
  padding-right: 0;
}
.published-blog-list .blog-list .blog-list-content {
  min-height: 140px;
  padding-top: 17px;
  padding-bottom: 17px;
}
.published-blog-list .blog-list .blog-title {
  color: #333;
  display: inherit;
  text-align: left;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: 700;
}
.published-blog-list .blog-list .publish-time{
  color: #969696;
}
.published-blog-list .blog-list p {
  text-align: left;
}
</style>
