<script>
export default {
  mounted() {
    this.resizeWeb()
    window.addEventListener('resize', () => {
      this.resizeWeb()
    })
  },
  methods: {
    resizeWeb() {
      var doc = document.documentElement
      var whdef = (doc.clientHeight / 914) * 1000
      doc.style.fontSize = whdef + 'px' //适用于PC网站
    }
  }
}
</script>

<template>
  <div class="about">
    <div class="left">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
    <div class="right">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  position: relative;
  outline: 1px solid red;
  .left,
  .right {
    position: absolute;
    right: 0.01rem;
    height: 100%;
    .box {
      width: 0.5rem;
      height: 0.28rem;
      margin-top: 0.02rem;
      margin-bottom: 0.01rem;
      background-color: aqua;
    }
  }
  .left {
    left: 0.01rem;
  }
}
</style>
