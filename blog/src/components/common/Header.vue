<template>
  <div class="header">
    <span class="header-title">圈子</span>
    <Menu mode="horizontal" :active-name="activeMenu === '//' ? '/blogList/' : activeMenu" @on-select="selectMenu">
        <MenuItem name="/blogList/">
            <Icon type="ios-paper"></Icon>
            首页
        </MenuItem>
        <!-- <MenuItem name="/">
            <Icon type="person"></Icon>
            关于我
        </MenuItem> -->
    </Menu>
    <Input v-model="headerSearch" icon="ios-search-strong" placeholder="搜索" @on-click="searchInfo" @on-enter="searchInfo" class="header-search-input"></Input>
    <div v-if="!isLogin">
      <Button type="text" class="login-btn action" @click="toLogin">登录</Button>
      <Button type="text" class="register-btn action" @click="toRegister">注册</Button>
    </div>
    <div v-if="isLogin" class="user-information">
      <Badge dot :count="informationCount">
        <Icon type="ios-bell"></Icon>
      </Badge>
    </div>
    <div v-if="isLogin" class="login-info">
      <Dropdown trigger="click" @on-click="selectUserInfoAction">
        <a href="javascript:void(0)">
          <Avatar :src="avatar" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="HomePage">
            <Icon type="ios-person"></Icon> <span>我的圈子</span>
          </DropdownItem>
          <DropdownItem name="Login">
            <Icon type="android-exit"></Icon> <span>退出</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <router-link to="/noteBooks" class="write-note">
      写文章
    </router-link>
  </div>
</template>

<script>
import utils_ from '@/tool/Utils'
export default {
  name: 'Header',
  data () {
    return {
      informationCount: 1,
      avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
      isLogin: false,
      headerSearch: '',
      activeMenu: '/' + utils_.getRouteName(this.$route.path, 1) + '/' + utils_.getRouteName(this.$route.path, 2)
    }
  },
  mounted () {
    if (window.sessionStorage.getItem('token')) {
      this.isLogin = true
    } else {
      this.$router.push({'name': 'Login', 'params': {'isLogin': true}})
    }
  },
  methods: {
    // 搜索(包括回车搜索和点击搜索图标搜索)
    searchInfo () {
    },
    selectMenu (name) {
      this.$router.push(name)
    },
    // 跳转到登陆
    toLogin () {
      this.$router.push({'name': 'Login', 'params': {'isLogin': true}})
    },
    // 跳转到注册
    toRegister () {
      this.$router.push({'name': 'Login', 'params': {'isLogin': false}})
    },
    selectUserInfoAction (name) {
      // 判断是否是退出
      if (name === 'Login') {
        window.sessionStorage.clear()
        this.$router.push({'name': name, 'params': {'isLogin': true}})
      } else if (name === 'HomePage') {
        this.$router.push({'name': name})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~assets/less/common.less';
.header {
  height: 60px;
  position: relative;
}
.header .login-info {
  position: absolute;
  top: 13px;
  right: 350px;
  z-index: 9;
}
.header .user-information {
  position: absolute;
  top: 13px;
  right: 420px;
  font-size: 24px;
  z-index: 9;
  cursor: pointer;
}
.header .ivu-dropdown .ivu-dropdown-item {
  text-align: left;
}
.header .ivu-dropdown .ivu-dropdown-item span {
  display: inline-block;
  line-height: 20px;
  vertical-align: top;
}
.header .ivu-dropdown .ivu-dropdown-item .ivu-icon {
  font-size: @icon_size;
  vertical-align: top;
  color: @main_color;
}
.header .action {
  position: absolute;
  top: 13px;
  color: #969696;
  z-index: 9;
  font-size: 15px;
}
.header .action:hover {
  color: @main_color;
}
.header .login-btn {
  right: 390px;
  border-right: 2px solid #CCC;
}
.header .register-btn {
  right: 330px;
}
.header .ivu-menu-horizontal.ivu-menu-light:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #F0F0F0;
  position: absolute;
  bottom: 0;
  left: 0;
}
.header .header-title {
  position: absolute;
  left: 0;
  top: 0;
  height: 60px;
  line-height: 60px;
  width: 25%;
  text-align: center;
  color: #726DD1;
  z-index: 9;
  font-size: 24px;
}
.header .header-search-input {
  position: absolute;
  right: 40%;
  top: 14px;
  width: 200px;
  z-index: 9;
}
.header .write-note {
  position: absolute;
  right: 200px;
  z-index: 9;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 10px 15px 0;
  border-radius: 20px;
  font-size: 15px;
  color: #fff;
  background-color: @main_color;
}
.header .ivu-menu-light {
  position: absolute;
  z-index: 1;
  background-color: #FFF;
  width: 100%;
  padding-left: 25%;
}
.header .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: #000;
  border-bottom: 0;
  font-size: 16px;
}
.header .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
  color: #726DD1;
  border-bottom: 0;
}
.header .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  border-bottom: 0;
}
</style>
