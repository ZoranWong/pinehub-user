<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" :back-color="'#fff'" />
        <div class="container" :style="{height: mainHeight + 'px'}">
            <!-- <div class="page-section-spacing" v-if="myConsumeCards.length">
                <ul class="scroll-view_H" :style="{width: myConsumeCards.length * 670 + 'rpx' }">
                    <li v-for="(tab,index) in myConsumeCards" class="scroll-view-item_H" :key="index" @click="cardDetails(tab['record_id'])">
                        <div  v-if="tab['card_remain_amount']" >
                            <img src="https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/mp_images/card.png" alt="">
                            <div class="price">
                                <div class="amount">{{tab['card_remain_amount']}}</div>
                                <div class="desc">现金抵用</div>
                            </div>
                        </div>
                        <img v-else src="https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/mp_images/meiqian.png" alt="">
                    </li>
                </ul>
            </div> -->
            <!-- 工会券 -->
           
                <div class="page-section-spacing " v-if="myConsumeCards.length">
                    <!-- //v-if="myConsumeCards.length" -->
                    <swiper   class="scroll-view_H">
                        <swiper-item  v-for="(tab,index) in myConsumeCards" :key="index"  style="position: relative;height:500rpx;margin-left:10px">
                            <img v-if="tab['state'] ===1" style="width:340px;height:300rpx;border-radius: 5px;" src="../../../../static/icons/card.png" alt="">
                            <img v-else style="width:340px;height:300rpx;border-radius: 5px;" src="../../../../static/icons/h_card.png" alt="">
                                <div class="breakfast">
                                    <div style="width:340px">
                                        <h2 style="font-size:30px;display: inline-block;">{{tab['card_name']}}</h2>
                                        <h3 style="font-size:20px;display: inline-block;position: absolute;right:25px" >{{tab['state_desc']}}</h3>
                                    </div>
                                    <p style="font-size:11px">CONSUMER CARD</p>
                                    <h3 v-if="tab['state'] ===1" style="font-size:20px">可享受<span style="color:red">无门槛</span>现金抵用券</h3>
                                    <h3 v-else style="font-size:20px">可享受<span style="color:#ADADAD">无门槛</span>现金抵用卡</h3>
                                    <p style="font-size:13px" >有效期：{{tab.start_time}}至{{tab['end_time']}}</p>
                                    <div class="card-bottom">
                                        <span class="money">￥{{tab['card_remain_amount']}}<span style="color:#999999;font-size:20px">现金抵用</span></span>
                                        <span  :class="tab['state'] !=1 ? 'uncomactive' : 'comactive'" v-if="tab['state']!=0" @click="consumptionDetails(tab['record_id'])">消费明细</span>
                                        <span  class="comactive" v-else  @click="Active(tab['record_id'])">确定激活</span>
                                    </div>
                                </div>
                                
                        </swiper-item >
                    </swiper>
                </div>

            <div class="exchange">
                <input type="text" v-model="code" placeholder="请输入兑换码">
                <span @click="exchangeCode">兑换</span>
            </div>

            <div class="exchangeRecords">
                <h3>兑换明细</h3>
                <ul :style="{'height': listHeight + 'px', overflow: 'auto'}" v-if="exchangedRecords.length">
                    <li v-for="(item, index) in exchangedRecords" :key="index">
                        <div class="left">
                            <h4>{{item['card_name']}}</h4>
                            <span>{{item['exchange_time']}}</span>
                        </div>
                        <h5>{{item['state']===0 ? '待激活' : '已激活'}}</h5>
                    </li>
                </ul>
                <div class="empty" v-else>
                    <img src="../../../../static/images/empty/empty_coupon.jpg" alt="">
                    <span>暂无兑换明细</span>
                </div>
            </div>



        </div>

    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '我的消费卡',
              exchangeVisible: false,
              code: '',
          };
        },
        components: {
			CustomHeader
        },
        computed: {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            },
            exchangedRecords () {
                return this.model.account.exchangedRecords
            },
            myConsumeCards () {
                return this.model.account.myConsumeCards
            },
            listHeight () {
                let systemInfo = wx.getSystemInfoSync();
			    let otherHeight = 610 * systemInfo.windowWidth / 750;
			    return this.mainHeight - otherHeight
            }
        },
        methods: {
            // 确认激活
            Active(id){
                this.$command('ACTIVATECARD',id);
                // this.onShow();

            },
            // 消费明细
            consumptionDetails(id){
                 this.$command('REDIRECT_TO', 'user.cardDetails', 'push', {
                    query: {
                        id: id
                    }
                });
            },
            exchangeCode () {
                this.$command('EXCHANGE', this.code)
            },
            cardDetails (id) {
                this.$command('REDIRECT_TO', 'user.cardDetails', 'push', {
                    query: {
                        id: id
                    }
                });
            },
            scroll () {

            }
        },
        mounted () {
        	this.$command('LOAD_EXCHANGE_RECORDS')
        	this.$command('LOAD_MY_CONSUME_CARDS')
        }
	}
</script>
<style>
    .breakfast{
        position: absolute;
        top: 10px;
        margin-left: 20rpx;
    }
    .card-bottom{
        width: 100%;
        /* position: relative; */
        overflow: hidden;
        margin-top: 30px;
        margin-left: -10px;
        
        
    }
  .money{
        font-size: 30px;
    }
    .comactive{
        color: #CE814F;
        font-size: 20px;
        border: 1px #CE814F solid;
        border-radius: 50px;
        float: right;
        padding: 5rpx 10rpx;
    }
    .uncomactive{
        color: #ADADAD;
        font-size: 20px;
        border: 1px #ADADAD solid;
        border-radius: 50px;
        float: right;
        /* margin-left: 200rpx; */
        padding: 5rpx 10rpx;
    }
    .back_img{
        background:url(../../../../static/icons/card.png) no-repeat;
        /* background: url(https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/mp_images/meiqian.png) no-repeat; */
    }

    

    .body{
        background-color: #fff;
    }

    .container{
        width: 100%;
    }

    .page-section-spacing {
        width: 100%;
        height: 440rpx;
        overflow-x: auto;
        border-bottom: 2rpx solid #F2F2F2;
        box-sizing: border-box;
        padding-left: 15rpx;
        padding-top: 20rpx;
    }
    /* .page-section-spacing img{
        width: 100%;
        height:300px ;
    } */

    .page-section-spacing::-webkit-scrollbar{
        width: 0;
        height: 0;
        color: transparent;
    }


    .scroll-view_H{
        /* overflow-x: auto; */
        /* overflow-y: hidden; */
        height: 400rpx;
        width: 100%;
        display: flex;
        white-space: nowrap;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .scroll-view_H li:first-child{
        margin-left: -10px !important;
    }

    .scroll-view-item_H{
        display: inline-block;
        width: 630rpx;
        height: 380rpx;
        margin-right: 40rpx;
        position: relative;
        overflow-y: hidden;
    }

    .scroll-view-item_H image{
        width: 630rpx;
        height: 380rpx;
    }

    .scroll-view-item_H .price{
        height: 36rpx;
        position: absolute;
        left: 80rpx;
        bottom: 36rpx;
        font-size: 46rpx;
        color: #333;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .scroll-view-item_H .amount{
        display: inline-block;
    }

    .scroll-view-item_H .price .desc{
        font-weight: normal;
        color: #999;
        font-size: 28rpx;
        margin-left: 11rpx;
        transform: translateY(-10rpx);
    }

    .exchange{
        width: 100%;
        box-sizing: border-box;
        padding: 0 25rpx 0 40rpx;
        height: 90rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        color: #666;
    }

    .exchange input{
        width: 600rpx;
        height: 60rpx;
        background:rgba(242,242,242,1);
        border-radius:10rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .exchangeRecords{

    }

    .exchangeRecords h3{
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
        font-weight: normal;
        color: #757575;
        background: #f2f2f2;
    }

    .exchangeRecords ul{

    }

    .exchangeRecords ul li{
        width: 100%;
        height: 150rpx;
        box-sizing: border-box;
        padding: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
    }

    .exchangeRecords ul li .left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .exchangeRecords ul li .left h4{
        font-weight: bold;
        font-size: 28rpx;
        color: #111;
    }

    .exchangeRecords ul li .left span{
        font-size: 24rpx;
        color: #757575;
    }

    .exchangeRecords ul li h5{
        font-weight: normal;
        font-size: #111;
        font-size: 28rpx;
    }

    .empty{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 150rpx;
    }

    .empty span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 50rpx;
    }

    .empty img{
        width: 374rpx;
        height: 288rpx;
    }


</style>
