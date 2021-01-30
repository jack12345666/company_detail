<template>
  <div id="container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-size: 0.15rem;
  background: #f5f5f5;
  .content {
    flex: 1;
    overflow: auto;
  }
  .footer {
    margin-top: 50px;
  }
}
</style>
