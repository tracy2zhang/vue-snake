<template lang="html">
  <div class="food" :style="positionStyle"></div>
</template>

<script>
  const size = 20
  export default {
    name: 'food',
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
  .food {
    position: absolute;
    left: 0;
    top: 0;
    width: @size;
    height: @size;
    background: #666;
    border-radius: 50%;
  }
</style>
