<template>
  <div>
    <div class="card">子组件使用范例{{userInfo.count}}</div>
  </div>
</template>

<script>
  export default {
    computed: {
      userInfo () {
        return this.$store.state.user
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    padding: 10px;
    text-align: center;
    border: 2rpx solid blue;
  }
</style>
