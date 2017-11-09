<template lang="html">
  <div class="container" :keydown.down="down">
    <div class="control">
      <button @click="start" :class="{ disabled: dead }">开始</button>
      <button @click="stop" :class="{ disabled: dead }">暂停</button>
      <button @click="up" :class="{ disabled: dead }">上</button>
      <button @click="down" :class="{ disabled: dead }">下</button>
      <button @click="left" :class="{ disabled: dead }">左</button>
      <button @click="right" :class="{ disabled: dead }">右</button>
      <button @click="reset" :class="{ disabled: !dead }">重置</button>
      <button @click="restart" :class="{ disabled: !dead }">重新开始</button>
    </div>
    <div class="snake-panel" :style="rectStyle">
      <div class="result">
        {{ result }}
      </div>
      <snake v-for="(pos, index) in snakeArr" :pos="pos" :key="index"></snake>
      <food :pos="food"></food>
    </div>
    <div class="note">
      按键: 空格控制开始/暂停  ↑↓←→控制方向
    </div>
  </div>
</template>

<script>
  import Snake from 'components/snake/snake'
  import Food from 'components/snake/food'
  const GRID_SIZE = 20
  const GRID_NUMBER = 30
  const getRandomPos = () => Math.round(Math.random() * (GRID_NUMBER - 1))
  const INTERVAL = 200
  const LEFT = -1
  const RIGHT = 1
  const UP = -2
  const DOWN = 2

  export default {
    name: 'snake-panel',
    components: { Snake, Food },
    mounted () {
      // this.start()
      document.addEventListener('keydown', e => {
        const { keyCode } = e
        switch (keyCode) {
          case 38:
            this.up()
            break
          case 40:
            this.down()
            break
          case 37:
            this.left()
            break
          case 39:
            this.right()
            break
          case 32:
            this.toggle()
            break
        }
      })
    },
    data () {
      return {
        dead: false,
        direction: RIGHT,
        speed: 1,
        snakeArr: [
          [0, 0]
        ],
        food: [getRandomPos(), getRandomPos()]
      }
    },
    computed: {
      rectStyle () {
        return {
          width: `${GRID_SIZE * GRID_NUMBER}px`,
          height: `${GRID_SIZE * GRID_NUMBER}px`
        }
      },
      result () {
        return this.dead ? '死了！' : null
      }
    },
    methods: {
      restart () {
        this.reset()
        this.start()
      },
      reset () {
        this.dead = false
        this.snakeArr = [[0, 0]]
        this.direction = RIGHT
      },
      toggle () {
        this.intv ? this.stop() : this.start()
      },
      start () {
        if (!this.intv) {
          this.intv = setInterval(() => {
            this.move()
          }, INTERVAL)
        }
      },
      stop () {
        if (this.intv) {
          clearInterval(this.intv)
          this.intv = null
        }
      },
      down () {
        this.changeDirection(DOWN)
      },
      up () {
        this.changeDirection(UP)
      },
      left () {
        this.changeDirection(LEFT)
      },
      right () {
        this.changeDirection(RIGHT)
      },
      changeDirection (direction) {
        if (this.direction === Math.abs(direction)) return
        this.direction = direction
        if (!this.intv) return
        this.stop()
        this.start()
        this.move()
      },
      move () {
        if (this.snakeArr.length <= 0) return
        let [x, y] = this.snakeArr[this.snakeArr.length - 1]
        const firstPos = this.snakeArr.shift()
        switch (this.direction) {
          case RIGHT:
            x += this.speed
            break
          case LEFT:
            x -= this.speed
            break
          case UP:
            y -= this.speed
            break
          case DOWN:
            y += this.speed
        }
        // const hitTheWall = x >= GRID_NUMBER || y >= GRID_NUMBER || x < 0 || y < 0
        const hitSelf = this.snakeArr.some(pos => x === pos[0] && y === pos[1])
        if (x >= GRID_NUMBER) {
          x = 0
        }
        if (x < 0) {
          x = GRID_NUMBER - 1
        }
        if (y >= GRID_NUMBER) {
          y = 0
        }
        if (y < 0) {
          y = GRID_NUMBER - 1
        }
        if (hitSelf) {
          this.snakeArr.unshift(firstPos)
          this.stop()
          this.over()
          return
        }
        const newPos = [x, y]
        if (this.collide(newPos, this.food)) {
          this.snakeArr.unshift(firstPos)
          this.food = [getRandomPos(), getRandomPos()]
        }
        this.snakeArr.push(newPos)
      },
      collide (pos1, pos2) {
        return pos1[0] === pos2[0] && pos1[1] === pos2[1]
      },
      over () {
        this.dead = true
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .control {
      margin: 10px auto;
      button {
        cursor: pointer;
        &.disabled {
          opacity: .5;
          pointer-events: none;
        }
      }
    }
    .snake-panel {
      position: relative;
      border: 1px solid rgba(34,36,38,.15);
      box-shadow: 0 0 2px 0 rgba(34,36,38,.15);
      .result {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: red;
        font-size: 30px;
      }
    }
    .note {
      font-size: 14px;
      margin-top: 5px;
    }
  }
</style>
