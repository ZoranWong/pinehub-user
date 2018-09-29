<template>
	<div id="footNav">
		<ul>
			<li @click="jump('index')">
				<img :src="index" />
				<i>首页</i>
			</li>
			<li>
				<img :src="scanning" />
				<i>扫码</i>
			</li>

			<li @click="jump('order')">
				<img :src="order" />
				<i>订单</i>
			</li>
			<li @click="jump('my')">
				<img :src="my" />
				<i>我的</i>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'FooterNav',
		props: ['navName'],
		data() {
			return {
				navName: "",
				index: "/static/images/index.png",
				scanning: "/static/images/scanning.png",
				order: "/static/images/order.png",
				my: "/static/images/my.png"
			};
		},
		methods: {
			nowNav(name) {
				switch(name) {
					case "index":
						this.index = "/static/images/index_now.png";
						break;
					case "scanning":
						this.scanning = "/static/images/scanning_now.png";
						break;
					case "order":
						this.order = "/static/images/order_now.png";
						break;
					case "my":
						this.my = "/static/images/my_now.png";
						break;
					default:
						this.index = "/static/images/index_now.png";
						break;
				}
			},
			jump(router){
				this.$command('router',router,'jump');
			}
		},
		created() {
			this.nowNav(this.navName);
			console.log(this.navName);
		}
	}
</script>

<style scoped>
	#footNav {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 108rpx;
		width: 750rpx;
		z-index: 999;
		background: #FFFFFF;
		border-top: 1rpx solid #eeeeee;
	}
	
	#footNav ul li {
		width: 25%;
		float: left;
	}
	
	#footNav ul li img {
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin: 13rpx auto 10rpx;
	}
	
	#footNav ul li i {
		text-align: center;
		color: #111111;
		font-size: 24rpx;
		font-weight: 200;
		line-height: 24rpx;
	}
</style>