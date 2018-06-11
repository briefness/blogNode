<template>
  <div class="wrapper">
    <iHeader></iHeader>
    <div class="wrapper-container">
      <router-view/>
    </div>
    <BackTop></BackTop>
    <iFooter></iFooter>
  </div>
</template>

<script>
import iHeader from './common/Header'
import iFooter from './common/Footer'
export default {
  name: 'Index',
  components: {
    iHeader,
    iFooter
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  display: -webkit-flex; /* Safari */
  min-height: 100vh;
  flex-direction: column;
  background-color: #FFF;
}
.wrapper-container {
  flex: 1;
  min-width: 600px;
  padding: 30px 0 0 20px;
}
</style>
