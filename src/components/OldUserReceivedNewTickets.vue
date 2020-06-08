<!--suppress ALL -->
<template>
    <div id="receivedOldTickets" >
        <div id="receivedOldTicketsContainer">
            <img class="gifs" src="../../static/gifs/oldGift.gif" alt="">
            <ul>
                <li v-for="ticket in tickets" :key="ticket.name" class="items" @click="goStore">
                    <div class="left">
                        <h3>{{ticket['benefit']}}</h3>
                        <h4>{{ticket['type'] === 'CASH' ? '元' : '折'}}</h4>
                    </div>
                    <div class="right">
                        <div class="top">
                            {{ticket['type'] === 'CASH' ? '【现金券】': '【折扣券】'}}
                            <span>{{ticket.name}}</span>
                        </div>
                        <dov class="bottom">
                            {{ticket['valid_term_desc'] || ticket['valid_at']}}
                        </dov>
                    </div>
                    <div class="icon">
                        <img src="../../static/images/tickets/background.jpg" alt="">
                    </div>
                </li>
            </ul>
            <img src="../../static/images/tickets/361302441.jpg" @click="goCenter" alt="" class="allTickets">
            <img src="../../static/icons/closed.jpg" @click="close" class="close" alt="">
        </div>

    </div>
</template>

<script>

	export default {
		name: 'ReceivedNewTickets',
        props: {
            coupons: {
                default: [],
                type: Array
            }
        },
        watch : {
        },
        data(){
		    return {
                tickets: []
            }
        },
        computed : {

        },
        methods: {
            close () {
                this.$emit('close')
            },
            goStore () {
                this.$emit('close')
                this.$command('REDIRECT_TO', 'user.store', 'push');
            },
            goCenter () {
                this.$emit('close')
                this.$command('REDIRECT_TO', 'couponCenter', 'push');
            }
        },

        mounted () {
		    let val = this.coupons;
            if (val.length > 3) {
                this.tickets = val.slice(0,3)
            } else {
                this.tickets = val
            }
        }
	}
</script>

<style>
    #receivedOldTickets{
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


    #receivedOldTicketsContainer{
        width: 78.9%;
        background: #fff;
        border-radius: 20rpx;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 42rpx;
        flex-direction: column;
        margin-top: 50rpx;
        box-sizing: border-box;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
    }

    .close{
        position: absolute;
        width: 60rpx;
        height: 60rpx;
        bottom: -140rpx;
    }

    #receivedOldTicketsContainer ul{
        width: 100%;
        margin-top: 170rpx;
        margin-bottom: 80rpx;
    }

    #receivedOldTicketsContainer ul .items{
        width: 100%;
        height: 156rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 21rpx 0;
        box-sizing: border-box;
        position: relative;
        z-index: 999;
    }

    #receivedOldTicketsContainer ul .items .icon{
        position: absolute;
        width: 100%;
        height: 156rpx;
        z-index: -100;
    }

    #receivedOldTicketsContainer ul .items .icon img{
        width: 100%;
        height: 100%;
    }

    #receivedOldTicketsContainer ul li .left {
        width: 130rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 2rpx dashed #fb1641;
        padding-left: 10rpx;
        box-sizing: border-box;
    }

    #receivedOldTicketsContainer ul li .left h3{
        font-size: 80rpx;
        color: #fb1641;
        margin-right: 5rpx;
    }

    #receivedOldTicketsContainer ul li .left h4{
        font-size: 28rpx;
        margin-left: 5rpx;
        color: #fb1641;
        margin-top: 30rpx;
    }

    #receivedOldTicketsContainer ul li .right {
        margin-left: 20rpx;
    }

    #receivedOldTicketsContainer ul li .right .top{
        color: #fb1641;
        font-size: 22rpx;
        font-weight: bold;
        line-height: 34rpx;
        width: 200rpx;
        word-break: break-all;
        box-sizing: border-box;
        position: relative;
    }
    #receivedOldTicketsContainer ul li .right .top:after{
        content: '';
        width: 100%;
        height: 2rpx;
        background: #fb1641;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    #receivedOldTicketsContainer ul li .right .top:before{
        content: '';
        width: 100%;
        height: 1rpx;
        background: #fb1641;
        position: absolute;
        bottom: 37rpx;
        left: 0;
    }

    #receivedOldTicketsContainer ul li .right .top span{
        font-weight: normal;
        margin-left: 20rpx;
    }

    #receivedOldTicketsContainer ul li .right .bottom{
        font-size: 22rpx;
        color: #999;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10w;
    }

    .allTickets{
        width: 100%;
        height: 114rpx;
        position: absolute;
        bottom: 0;
        z-index: 10000;
    }

</style>
