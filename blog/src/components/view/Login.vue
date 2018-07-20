<template>
  <div class="login">
    <div class="logo">
      圈子
    </div>
    <p class="subheading">找到属于你的圈子</p>
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a :class="{active: isActive}" @click="triggerLogin">登录</a>
          <b>·</b>
          <a :class="{active: !isActive}" @click="triggerRegister">注册</a>
        </div>
      </h4>
      <div class="login-form" v-if="isActive">
        <Form ref="userInfo" :model="userInfo" :rules="ruleValidate">
           <FormItem prop="username">
               <Input type="text" size="large" placeholder="手机号或邮箱" v-model="userInfo.username">
                 <Icon type="ios-person-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
            <FormItem prop="password">
                <Input type="password" size="large" placeholder="密码" v-model="userInfo.password" @on-enter="handleLoginSubmit('userInfo')">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
           <FormItem>
               <Button type="primary" @click="handleLoginSubmit('userInfo')">登陆</Button>
           </FormItem>
        </Form>
      </div>
      <div class="register-form" v-if="!isActive">
        <Form ref="registerInfo" :model="registerInfo" :rules="registerRuleValidate">
           <FormItem prop="nickname">
               <Input type="text" size="large" placeholder="你的昵称" v-model="registerInfo.nickname">
                 <Icon type="ios-person-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
            <FormItem prop="mobile">
                <Input type="text" size="large" placeholder="手机号" v-model="registerInfo.mobile">
                  <Icon type="iphone" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="regPasswd">
                <Input type="password" size="large" placeholder="设置密码" v-model="registerInfo.regPasswd">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
           <FormItem>
               <Button type="primary" @click="handleRegisterSubmit('registerInfo')">注册</Button>
           </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as resApi from '@/service/fetchData'
import MD5 from 'crypto-js/md5'
const validateMobile = (rule, value, callback) => {
  let mobileReg = /^1[3|4|5|7|8][0-9]{9}$/
  if (value === '') {
    callback(new Error('请填写手机号'))
  } else if (!mobileReg.test(value)) {
    callback(new Error('手机号错误'))
  } else {
    callback()
  }
}
export default {
  name: 'Login',
  data () {
    return {
      isActive: true,
      userInfo: {
        password: '',
        username: ''
      },
      registerInfo: {
        regPasswd: '',
        mobile: '',
        nickname: ''
      },
      ruleValidate: {
        password: [
          {required: true, message: '请填写密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
        ],
        username: [
          { required: true, message: '请填写手机号或邮箱', trigger: 'blur' }
        ]
      },
      registerRuleValidate: {
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        regPasswd: [
          {required: true, message: '请填写密码', trigger: 'blur'},
          {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    if (this.$route.params.isLogin) {
      this.isActive = this.$route.params.isLogin
    }
  },
  methods: {
    // login
    handleLoginSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let password = MD5(this.userInfo.password).toString()
          let res = await resApi.accountLogin(this.userInfo.username, password)
          if (res && res.data) {
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('userId', res.data.userId)
            window.sessionStorage.setItem('username', res.data.username)
            this.$router.push('/blogList')
          } else {
            this.$Message.error(res.message)
          }
        }
      })
    },
    // register
    handleRegisterSubmit () {
      this.$Message.warning({
        content: '暂不提供注册功能',
        duration: 5
      })
    },
    triggerRegister () {
      this.isActive = false
      this.$refs['userInfo'].resetFields()
    },
    triggerLogin () {
      this.isActive = true
      this.$refs['registerInfo'].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~assets/less/common.less';
.login {
  height: 100%;
  min-height: 750px;
  text-align: center;
  font-size: 14px;
  background-color: #f1f1f1;
  position: relative;
}
.login .logo {
  width: 100px;
  font-size: 50px;
  position: absolute;
  top: 56px;
  left: 50px;
  color: @main_color;
  cursor: pointer;
}
.login .subheading {
  width: 10px;
  font-size: 30px;
  position: absolute;
  top: 130px;
  left: 72px;
  color: @main_color;
  cursor: pointer;
}
.login .main {
  width: 400px;
  margin: 120px auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  vertical-align: middle;
  display: inline-block;
}
.login .main .title {
  font-size: 18px;
  margin: 0 auto 50px;
  padding: 10px;
  font-weight: 400;
  color: #969696;
}
.login .main .title a {
  padding: 10px;
  color: #969696;
}
.login .main .title a:hover {
  border-bottom: 2px solid @main_color;
}
.login .main .title a.active {
  font-weight: 700;
  color: @main_color;
  border-bottom: 2px solid @main_color;
}
/* 表单 */
.login-form .ivu-input-group {
  font-size: 20px;
}
.login .ivu-btn.ivu-btn-primary {
  width: 100%;
  font-size: 18px;
  border-radius: 25px;
  margin-top: 20px;
}
.login .register-form .ivu-btn.ivu-btn-primary {
   background-color: #42c02e;
   border-color: #42c02e;
 }
</style>
