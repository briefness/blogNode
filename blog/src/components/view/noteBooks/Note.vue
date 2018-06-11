<template>
  <div class="write-note">
    <mavon-editor v-model="note" @save="saveNote"/>
  </div>
</template>

<script>
export default {
  name: 'Note',
  data () {
    return {
      note: ''
    }
  },
  mounted () {},
  methods: {
    // 保存方法
    saveNote () {
      console.log(this.note)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
