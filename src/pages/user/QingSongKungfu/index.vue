<!--suppress ALL -->
<template>
    <div class="cakes">
        <CustomHeader :title="title" :needReturn="true" />
        <div class="header">
            青松功夫
        </div>
        <div class="banners">

        </div>
        <div class="cakeService" @touchstart="start" @touchmove="move" :style="{'left': left +'px', 'top': top+'px'}">
            <img class="service"  src="../../../../static/icons/cakeService.png" alt="">
        </div>
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	export default {
		components: {
			CustomHeader
		},
		data() {
			return {
				title: '生日蛋糕预定',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0,
                startPoint: {},
                left: 315,
                top: 450
			};
		},
		watch: {

		},
		computed: {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},

		},
		methods: {
            start(e){
                this.startPoint = e.touches[0];
            },
            move (e) {
                let endPoint = e.touches[e.touches.length - 1];
                let translateX = endPoint.clientX - this.startPoint.clientX
                let translateY = endPoint.clientY - this.startPoint.clientY
                this.startPoint = endPoint
                let top = this.top + translateY
                let left = this.left + translateX
                //判断是移动否超出屏幕
                if (left + 90 >= this.screenWitdh/ 2) {
                    left = this.screenWitdh/2 - 90;
                }
                if (left <= 0) {
                    left = 0;
                }
                if (top <= 85) {
                    top = 85
                }
                if (top + 60 >= this.screenHeight /2) {
                    top = this.screenHeight/2 - 60;
                }
                this.top = top;
                this.left = left;
            },
        },
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
		mounted() {

        }
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    @import "index.css";



</style>
