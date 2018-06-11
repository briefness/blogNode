<template>
  <div class="recommend-collection">
    <a class="collection" v-for="(collection, index) in recommendCollectionInfo" :key="index">
      <img v-lazy="collection.collectionImg">
      <div class="collection-name">{{collection.collectionName}}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'RecommendCollection',
  data () {
    return {
      recommendCollectionInfo: [
        {
          collectionImg: '//upload.jianshu.io/collections/images/83/1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
          collectionName: '摄影圈'
        },
        {
          collectionImg: '//upload.jianshu.io/collections/images/4/sy_20091020135145113016.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
          collectionName: '读书圈'
        },
        {
          collectionImg: '//upload.jianshu.io/collections/images/14/6249340_194140034135_2.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64',
          collectionName: 'IT圈'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommend-collection {
  margin-bottom: 20px;
  overflow: hidden;
}
.recommend-collection .collection {
  display: inline-block;
  margin: 0 18px 18px 0;
  min-height: 32px;
  background-color: #f7f7f7;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  float: left;
  overflow: hidden;
}
.recommend-collection .collection img {
  float: left;
  width: 32px;
  height: 32px;
}
.recommend-collection .collection-name {
  float: left;
  display: inline-block;
  padding: 0 11px 0 6px;
  line-height: 32px;
  font-size: 14px;
  color: #333;
}
</style>
