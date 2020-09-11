<template>
  <div id="get_coupon">
    <div id="coupon">
      <div id="top_tit">
        <div id="right_tit" @click="closeCoupon">
          <img
            style="width:80rpx;height:80rpx;"
            src="../../static/images/icon/close_conmer.png"
            alt
          />
        </div>

        <div id="left_tit">
          <img
            style="width:44rpx;height:38.72rpx;margin-right:5rpx"
            src="../../static/images/icon/VIP.png"
          />您获得一张消费卡请激活
        </div>
      </div>
      <div style="position: relative;">
        <img
          style="width:100%;height:300rpx;margin-top:10px"
          src="../../static/images/icon/semicircle.png"
          alt
        />
        <div>
          <img
            style="width:44rpx;height:72rpx;position: absolute;top:-40rpx;left:115rpx"
            src="../../static/images/icon/top_left.png"
            alt
          />
        </div>
        <div>
          <img
            style="width:44rpx;height:72rpx;position: absolute;top:-40rpx;right:115rpx"
            src="../../static/images/icon/top_left.png"
            alt
          />
        </div>
      </div>
      <div class="coupon_title">
        <img src="../../static/icons/card.png" alt />
        <div class="about_coucon">
          <h2 style="font-size:25px;display: inline-block;">{{consumerCard['card_name']}}</h2>
          <p style="font-size:11px">CONSUMER CARD</p>
          <h3 style="font-size:20px;font-weight: 700;">
            可享受
            <span style="color:red">无门槛</span>现金抵用券
          </h3>
          <p style="font-size:13px">使用场景：{{consumerCard.used_scene}}</p>
        </div>
        <div class="purpose">
          <span style="font-weight: 700;margin:0 10px;">￥{{consumerCard['card_remain_amount']}}</span><span style="color:#ccc">现金抵用</span>
        </div>
      </div>

      <div id="coupon_bottom">
        <button @click="confirm(consumerCard['record_id'])">确定激活</button>
      </div>
    </div>
  </div>
</template>
<script>
	export default {
        name: 'LabourUnionCoupon',
        props: {
            consumerCard: Object
        },
        data () {
            return {

            }
        },
        methods: {
            closeCoupon () {
                console.log('-------------------------- on show ----------', [this.consumerCard]);
                this.model.account.dispatch('addConsumerCardId', {id: this.consumerCard['record_id']});
                this.$emit('close');
            },
            async confirm (id) {
                this.model.account.dispatch('addConsumerCardId', {id: this.consumerCard['record_id']});
                await this.$command('ACTIVATECARD', id)
                await this.$command('CLEAR_ACTIVE');
                this.$emit('close');
            }
        },
        mounted () {
          console.log('===================== consumer popup ================', this.model.account);
        },
        onShow () {
          console.log('-------------------------- on show ----------')
        },
        onHide () {
            console.log('on hide --------------------');
        }
	}
</script>

<style  scoped>
.purpose {
  position: absolute;
  bottom: 5px;
  height: 40px;
  width: 90%;
  line-height: 40px;
   margin: 0px 34rpx;
  background: #ffffff;
}
.coupon_title {
  position: relative;
  margin-top: -270rpx;

}
.coupon_title img{
  width:90%;
  border-radius: 5px;
  height:340rpx;
  margin:5rpx 35rpx;
  -moz-box-shadow:0px 2px 20px #cccccc;
  -webkit-box-shadow:0px 2px 20px #cccccc;
   box-shadow:0px 2px 20px #cccccc;
}
.about_coucon {
  position: absolute;
  top: 25px;
  left: 30px;
}

#get_coupon {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
}
#coupon {
  background: #ffffff;
  width: 700rpx;
  border-radius: 10rpx;
}

#top_tit {
  position: relative;
  background: #ffffff;
  margin-bottom: 50rpx;
  /* overflow: hidden; */
}
#left_tit {
  margin: 20rpx 0 30rpx 20rpx;
  font-size: 32rpx;
  text-align: center;
}
#right_tit {
  /* float: right;
        margin-right: 10px; */
  position: absolute;
  right: -25rpx;
  top: -45rpx;
}
#right_tit img {
  width: 29rpx;
  height: 29rpx;
}
#coupon_bottom {
  padding: 10px 0;
  background: #ffffff;
  clear: both;
  margin-bottom: 10px;
}
#coupon_bottom button {
  color: #fff;
  background: #fdcc02;
  height: 70rpx;
  line-height: 70rpx;
  width: 590rpx;
}
</style>
