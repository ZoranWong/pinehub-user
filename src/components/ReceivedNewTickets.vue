<!--suppress ALL -->
<template>
    <div id="receivedNewTickets" >
        <div id="receivedNewTicketsContainer">
            <img class="gifs" src="../../static/gifs/newGift.gif" alt="">
            <h3>恭喜你获得 <span>新人专享优惠券</span>大礼包 </h3>
            <em>优惠券已放入卡包里</em>
            <button @click="goStore">去卡包看看</button>
            <img src="../../static/icons/closed.jpg" @click="close" class="close" alt="">
        </div>

    </div>
</template>

<script>

	export default {
		name: 'ReceivedNewTickets',
        data(){
		    return {

            }
        },
        computed : {

        },
        methods: {
            close () {
                this.$emit('close')
            },
            goStore () {
                this.$command('REDIRECT_TO', 'couponCenter', 'push');
            }
        },

        mounted () {

		}
	}
</script>

<style>
    #receivedNewTickets{
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
        z-index: 10000;

    }


    #receivedNewTicketsContainer{
        width: 592rpx;
        height: 420rpx;
        background: #fff;
        border-radius: 20rpx;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 42rpx;
        flex-direction: column;
    }

    .close{
        position: absolute;
        width: 60rpx;
        height: 60rpx;
        bottom: -140rpx;
    }


    .gifs{
        position: absolute;
        top: -163rpx;
        width: 366rpx;
        height: 326rpx;
    }

    #receivedNewTicketsContainer h3{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #111;
        margin-top: 135rpx;
        margin-bottom: 20rpx;
    }

    #receivedNewTicketsContainer h3 span{
        color: #fe4a2c;
    }

    #receivedNewTicketsContainer em{
        display: block;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        color: #999;
        margin-bottom: 24rpx;
    }

    #receivedNewTicketsContainer button {
        width: 100%;
        height: 68rpx;
        display: flex;
        background: #FFCC00;
        justify-content: center;
        align-items: center;
        border-radius: 34rpx;
        color: #fff;
        font-size: 32rpx;
        margin-top: 30rpx;
    }

</style>
