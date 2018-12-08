<!--suppress ALL -->
<template>
    <div id="">
        <div id="e-chart-info">
            销售曲线图表
            <em>(每晚21:00更新当日数据)</em>
        </div>
        <div id="e-chart-num">{{unit}}</div>
        <div class="e-charts">
            <charts v-if = "show" :echarts="echarts" :onInit="onInit" :canvasId="canvasId" :throttleTouch = "true" :lazy-load= "lazy"/>
        </div>
    </div>
</template>

<script>
    import * as echarts from './echarts';
    import mpvueEcharts from 'mpvue-echarts';
    export default {
        props: ['options', 'unit', 'canvasId'],
        components: {
            'charts': mpvueEcharts
        },
        data () {
            return {
                show: true,
                echarts: echarts,
                lazy: true
            }
        },
        methods: {
            onInit (canvas, width, height) {
                let chart = this.echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(chart);

                chart.setOption(this.options);

                return chart; // 返回 chart 后可以自动绑定触摸操作
            }
        },
        watch: {
            options: {
                handler (options) {
                    this.show = false;
                    this.lazy = true;
                    this.$nextTick(function () {
                        this.show = true;
                        this.lazy = false;
                    });
                },
                deep: true
            }
        }
    }
</script>

<style>
    .e-charts {
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

    #e-chart-info {
        font-size: 30rpx;
        font-weight: 300;
        margin-bottom: 10rpx;
        line-height: 48rpx;
    }

    #e-chart-info em {
        display: inline-block;
        font-size: 22rpx;
        color: #CCCCCC;
        margin-left: 5rpx;
    }

    #e-chart-info i {
        display: inline-block;
        font-size: 22rpx;
        color: #CCCCCC;
        float: right;
    }

    #e-chart-num {
        font-size: 24rpx;
        font-weight: 300;
        margin-bottom: 10rpx;
    }
</style>
