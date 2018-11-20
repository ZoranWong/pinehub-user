<template>
  <div id="">
    <div id="mychart-info">
      销售曲线图表
      <em>(每晚21:00更新当日数据)</em>
    </div>
    <div id="mychart-num">{{unit}}</div>
    <div class="mycharts">
      <ec-canvas class="canvas" id="mychart" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['options', 'unit'],
    data () {
      return {
        ec: {
          options: this.options
        }
      }
    },
    watch: {
      options: {
        handler (newValue, oldValue) {
          this.ec.options = newValue;
        },
        deep: true
      }
    },
    created () {

    },
    mounted () {},
    methods: {
      getOptions: function (newValue) {
        this.ec.options = newValue
      }
    }
  }
</script>

<style>
  .mycharts {
    height: 360rpx;
    width: 100%;
  }

  ec-canvas {
    width: 600rpx;
  }

  canvas {
    position: relative;
    top: 0;
    left: 0;
  }

  #mychart-info {
    font-size: 30rpx;
    font-weight: 300;
    margin-bottom: 10rpx;
    line-height: 48rpx;
  }

  #mychart-info em {
    display: inline-block;
    font-size: 22rpx;
    color: #CCCCCC;
    margin-left: 5rpx;
  }

  #mychart-info i {
    display: inline-block;
    font-size: 22rpx;
    color: #CCCCCC;
    float: right;
  }

  #mychart-num {
    font-size: 24rpx;
    font-weight: 300;
    margin-bottom: 10rpx;
  }
</style>
