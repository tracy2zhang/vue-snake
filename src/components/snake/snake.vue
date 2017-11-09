<template lang="html">
  <div class="snake" :style="positionStyle"></div>
</template>

<script>
  const size = 20
  export default {
    name: 'snake',
    props: {
      pos: {
        type: Array,
        default: [0, 0]
      }
    },
    computed: {
      positionStyle () {
        const [x, y] = this.pos
        return {
          transform: `translate3d(${size * x}px, ${size * y}px, 0)`
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @size: 20px;
  .snake {
    position: absolute;
    left: 0;
    top: 0;
    width: @size;
    height: @size;
    background: #333;
  }
</style>
