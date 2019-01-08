<!--suppress ALL -->
<template>
  <div v-if = "ticket" class="coupon-wrapper clearfix bgff">
    <div class="coupon-left fl ">
      <div class="voucher-part1 bgff ">
        <span class="voucher-logon-name">{{ ticket.title }} </span>
        <span class="voucher-value">{{ticket.type === 'DISCOUNT' ? ((ticket.discount * 100) + '%') : ('¥' + ticket.reduceCost) }}</span>
      </div>
      <div class="voucher-part2">
        <div class="voucher-name bgff">{{ticket.type === 'DISCOUNT' ? '折扣券' : '优惠券'}}</div>
      </div>
    </div>
    <div class="coupon-right fr">
      <p class="voucher-title">{{(ticket.leastCost > 0 ? ('满' + ticket.leastCost + '元'): '') +
        (ticket.type === 'DISCOUNT' ? ((((ticket.discount * 100) % 10) ? (ticket.discount * 100):(ticket.discount * 10))  + '折优惠') : ('减' + ticket.reduceCost + '元'))}}</p>
      <p class="time-limit" v-if = "ticket.beginTimestamp">
        <span>有效期：</span>
        <span>{{ticket.beginTimestamp}} - {{ticket.endTimestamp}}</span>
      </p>
      <div v-if = "ticket.status === 2" class="btn-big fr theme-color" >已使用</div>
      <div v-else-if = "ticket.status === 1" class="btn-big fr theme-color" @click = "useTicket">立即使用</div>
      <div v-else class="over-date">
          <image style ="width: 136rpx; height: 136rpx; margin-left: 120rpx;" src = "../../../static/images/ticket_over_date.png"></image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      ticket: {
        default: null,
        type: Object
      },
      usedCardCode: {
        default: null,
        type: String
      }
    },
    computed: {
      isUsed () {
        console.log(this.usedCardCode ,  this.ticket);
        if (this.usedCardCode && this.ticket && this.usedCardCode === this.ticket.cardCode) {
          return true;
        }else{
          return false;
        }
      }
    },
    methods: {
      useTicket() {
        try {
          this.$emit('useTicket', this.ticket);
          this.mp.storage.set('useTicket', this.ticket.id);
        } catch (e) {
          console.log(e);
        }
      }
    },
    mounted() {
    }
  }
</script>

<style>
  .coupon-wrapper {
    position: relative;
    width: 710rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    box-shadow: 0rpx 6rpx 20rpx rgba(204, 202, 202, 0.6);
    box-sizing: border-box;
    padding-bottom:20px;
    margin-left:10px;
  }

  .coupon-left {
    width: 260rpx;
    box-sizing: border-box;
    margin-left: 50rpx;
    position: relative;
    z-index: 2;
  }

  .coupon-left:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 180rpx;
    height: 95%;
    background-color: #f2f2f2;
    border-radius: 10rpx;
    transform: rotate(-15deg) translate(-20rpx, 15rpx);
  }

  .coupon-left:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 180rpx;
    height: 95%;
    background-color: #f2f2f2;
    border-radius: 10rpx;
    transform: rotate(15deg) translate(20rpx, 15rpx);
  }

  .voucher-part1 {
    width: 260rpx;
    height: 188rpx;
    border-radius: 10rpx 10rpx 0rpx 0prx;
    box-shadow: 0rpx 8rpx 28rpx rgba(204, 202, 202, 0.6);
    border-bottom: 2rpx dashed #e0e0e0;
    box-sizing: border-box;
    text-align: center;
  }

  .voucher-part1 span {
    display: block;
  }

  .voucher-part1 .voucher-logon-name {
    font-size: 22rpx;
    font-weight: 700;
    padding-top: 30rpx;
  }

  .voucher-part1 .voucher-value {
    font-size: 68rpx;
    font-weight: 700;
    color: #fece00;
    font-style: italic;
    margin-top: 48rpx;
    line-height: 53rpx;
    box-sizing: content-box;
  }

  .voucher-part2 {
    width: 260rpx;
    height: 90rpx;
    position: relative;
  }

  .voucher-part2:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    background: radial-gradient(circle at 0 50%, transparent 0%, transparent 20rpx, white 20rpx, white 100%);
    border-bottom-left-radius: 10rpx;
  }

  .voucher-part2:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    background-image: radial-gradient(circle at 100% 50%, transparent 0%, transparent 10px, white 10px, white 100%);
    border-bottom-right-radius: 10rpx;
  }

  .voucher-name {
    width: 60%;
    position: absolute;
    top: 0;
    font-size: 26rpx;
    left: 20%;
    line-height: 90rpx;
    text-align: center;
    box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(204, 202, 202, 0.6);
  }

  .coupon-right {
    width: 330rpx;
    box-sizing: border-box;
  }

  .coupon-right .voucher-title {
    margin: 24rpx 0;
    font-size: 24rpx;
  }

  .coupon-right .time-limit {
    font-size: 26rpx;
    margin-bottom: 24rpx;
    color: #757575;
  }

  .coupon-right .time-limit span {
    display: block;
  }

  /*noinspection ALL*/
  .coupon-right .btn-big {
    width: 198rpx;
    height: 52rpx;
    line-height: 54rpx;
    border-radius: 30rpx;
    text-align: center;
    font-size: 26rpx;
    margin-right: 112rpx;
    margin-bottom: 30rpx;
  }

  .overdue {
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: url(../../static/images/icon/overdue.png) no-repeat;
    background-size: contain;
    margin-right: 50rpx;
    margin-top: -10rpx;
    margin-bottom: 20rpx;
  }
</style>
