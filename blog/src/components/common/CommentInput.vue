<template>
  <div class="comment-area-input">
    <div class="new-comment">
      <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" class="avatar" />
      <textarea v-model="commentInfo.comment" placeholder="写下你的评论..." @focus="getFocusSwitchShowAction"></textarea>
      <div class="write-function-block" v-if="showAction">
        <div class="hint">Ctrl+Enter 发表</div>
        <a class="btn btn-send" @click="sendComment">发送</a>
        <a class="cancel" @click="cancelComment">取消</a>
      </div>
    </div>
  </div>
</template>

<script>
import utils_ from '@/tool/Utils'
export default {
  name: 'CommentInput',
  data () {
    return {
      showAction: false,
      commentInfo: {
        comment: ''
      }
    }
  },
  mounted () {},
  methods: {
    // textarea获取焦点事件
    getFocusSwitchShowAction () {
      this.showAction = true
    },
    // 发送评论
    sendComment () {
      if (utils_.stringIsNull(this.commentInfo.comment)) {
        this.$Message.warning('回复内容不能为空')
      } else {
        this.showAction = false
      }
    },
    // 取消评论
    cancelComment () {
      this.showAction = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-area-input .new-comment {
  position: relative;
  margin-left: 48px;
  margin-bottom: 20px;
}
.comment-area-input .new-comment .avatar {
  position: absolute;
  left: -48px;
  cursor: pointer;
}
.comment-area-input .new-comment textarea {
  padding: 10px 15px;
  width: 100%;
  height: 80px;
  font-size: 13px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: hsla(0,0%,71%,.1);
  resize: none;
  display: inline-block;
  vertical-align: top;
  outline-style: none;
}
.comment-area-input .new-comment .write-function-block {
  height: 50px;
}
.comment-area-input .new-comment .write-function-block .hint {
  float: left;
  margin: 20px 0 0 20px;
  font-size: 13px;
  color: #969696;
}
.comment-area-input .new-comment .write-function-block .cancel {
  float: right;
  margin: 18px 30px 0 0;
  font-size: 16px;
  color: #969696;
}
.comment-area-input .new-comment .write-function-block .btn-send {
  float: right;
  width: 78px;
  margin: 10px 0;
  padding: 8px 18px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  color: #fff!important;
  background-color: #42c02e;
  cursor: pointer;
  outline: none;
  display: block;
}
</style>
