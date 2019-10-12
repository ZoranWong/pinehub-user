<!--suppress ALL -->
<template>
    <div id="points_wrapper" >
        <div id="points_container">
            <div id="closeIcon" @click="closeWrapper">
                <i class="iconfont closeIcon"  @click="close">&#xe658;</i>
            </div>
            <div class="header_img">
                <img src="../../static/selfPoints/header.jpg" alt="">
            </div>
            <div id="points_container_header" :style="{'backgroundImage':'url(' + background + ')'}">
                <span @click="changeBackground('left')">常用自提点</span>
                <span @click="changeBackground('right')">附近自提点</span>
            </div>
            <ul id="points_container_list">
                <li v-for="item in points" :key="item.id" @click="payment(item)">
                    <i class="iconfont">&#xe65a;</i>
                    <span>
                           {{item.address}}
                    </span>
                </li>
            </ul>
            <button id="points_more" @click="nearbyStores">查看更多</button>
            <h5 id="points_notice">注：请您务必在规定时间前领取您的早餐</h5>
        </div>
        <div id="points_wrapper_clone" @click="closeWrapper"></div>
    </div>
</template>

<script>
    let bg1 = require('../../static/selfPoints/bg2.jpg');
    let bg2 = require('../../static/selfPoints/bg1.jpg');

	export default {
		name: 'ChooseSelfRaisingPoint',
        data(){
		    return {
		    	background: bg1,
                points: [],
                type : ''
            }
        },
        computed : {
			commonlyPoints () {
				let points;
				if (this.type === 'mall') {
					points = this.model.user.store.commonlyPoints;
                } else {
					points = this.model.user.map.commonlyMapPoints
                }
				this.points = points;
				return points
			},
			nearbyPoints () {
				let points;
				if (this.type === 'mall') {
					points = this.model.user.store.nearbyPoints;
				} else {
					points = this.model.user.map.nearbyMapPoints
				}
				this.points = points;
				return points
			}
        },
        methods: {
			close () {
				this.$emit('close')
			},
			closeWrapper(){
				this.model.user.store.dispatch('selectPoints', { boolean: false})
				this.model.newEvents.shoppingCarts.dispatch('selectPoints', { boolean: false})
            },
            async changeBackground(position){
                if (position === 'left') {
                	this.background = bg1;
					this.$command('LOAD_COMMONLY_USED', this.type)
                } else {
					let result = await this.map.getLocation();
					this.background = bg2;
					//this.$command('LOAD_NEARBY',result[0],result[1])
					this.$command('LOAD_NEARBY',-73.9878441,40.7484404, this.type)
                }
            },
			nearbyStores () {
				this.$command('REDIRECT_TO', 'storesMap', 'push', {query: {
                    type: this.type
                }});
			},
            payment (item) {
				this.$command('SELECTED_POINT_COMMAND', item)
				this.$command('REDIRECT_TO', 'user.order.payment', 'push',{
					query: {type: this.type}
                });
            }
        },

        mounted () {
			let type = this.model.user.store.mallType || this.model.newEvents.shoppingCarts.breakfastType;
			this.type = type
			this.$command('LOAD_COMMONLY_USED',type);
		}
	}
</script>

<style>

    button:after{
        border: none;
    }

    #points_wrapper{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(17,17,17,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #points_wrapper_clone{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 100;
    }

    #points_wrapper #points_container{
        box-sizing: border-box;
        width: 630rpx;
        border-radius: 10rpx;
        background: #fff;
        position: relative;
        padding: 50rpx;
        z-index: 10000;
    }

    #points_wrapper #points_container .header_img{
        position: absolute;
        top: -80rpx;
        left: 256rpx;

    }

    #points_wrapper #points_container .header_img img{
        width: 118rpx;
       height: 166rpx;
    }

    #points_wrapper #points_container #closeIcon{
        border: 6rpx solid #fff;
        background: #fff;
        position: absolute;
        right: -16rpx;
        top: -16rpx;
        border-radius: 50%;
        width: 64rpx;
        height: 64rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #points_wrapper #points_container .closeIcon{
        font-size: 64rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    #points_wrapper #points_container #points_container_header{
        width: 100%;
        height: 80rpx;
        margin-top: 70rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100%;
    }

    #points_wrapper #points_container #points_container_header span{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
    }

    #points_wrapper #points_container #points_container_list{
        width: 100%;
    }

    #points_wrapper #points_container #points_container_list li{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 2rpx solid #f2f2f2;
    }

    #points_wrapper #points_container #points_container_list li:last-child{
        border-bottom: 0;
    }

    #points_wrapper #points_container #points_container_list li i{
        font-size: 40rpx;
        margin: 0 10rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    #points_wrapper #points_container #points_container_list li span {
        display: inline-block;
        font-size: 28rpx;
        color: #111111;
        margin: 0 10rpx;
    }

    #points_wrapper #points_container #points_more{
        margin-top: 30rpx;
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        color: #111111;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
        border: 1px solid #fff !important;
    }

    #points_wrapper #points_container #points_notice{
        font-size: 20rpx;
        color: #757575;
        font-weight: normal;
        margin-top: 20rpx;
        margin-bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
