<template>
  <div class="body">
    <div class="bgcolor theme-color">
        <div class="logo">
           <img src="">
        </div>
    </div>
    <div class="content">
        <div class="mobile-phone-number-authorization">
            <div class="phone-number theme-color">
               手机号授权
            </div>
            <div class="phone-tips ">
               我们需要您的手机号来创建账号，累计积分
            </div>
         </div>
        <div class="main-nav">
          <div class="main-nav-top clearfix">
            <div class="today-order fl">
              <a href="/pages/todayOrder/main">
                <img src="../../../static/images/today-order.png">
                <span>当日下单</span>
              </a>
            </div>
            <div class="reserve-shop fr">
              <img src="../../../static/images/reserve-shop.png" >
              <span>预定商城</span>
            </div>
          </div>
          <div class="main-nav-bottom">
            <div class="new-activity">
             <a href="/pages/newProduct/main">
              新品预定
            </a> 
            </div>
          </div>
        </div>
        <ul class="footer clearfix bgff">
          <li class="fl">
              <img src="../../../static/images/home-selected.png" >
              <span class="select">首页</span>
          </li>
          <li class="fl">
              <img src="../../../static/images/scavenging.png">
              <span>扫码</span>
          </li>
          <li class="fl">
              <img src="../../../static/images/order.png">
              <span>订单</span>
          </li>
          <li class="fl">
            <a href="/pages/my/main">
              <img src="../../../static/images/my.png">
              <span>我的</span>
            </a>
          </li>
        </ul>
      </div>
   </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
   
  },

  created () {
    console.log(this['mp.storage']);
    this['mp.storage'].set('test', {'ll':'lll'});
   console.log(this['mp.storage'].get('test')) ;
    this['mp.storage'].remove('test');
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }

}
</script>

<style scoped>
/*.body{
  width:750rpx;
  height:1334rpx;
  border:2rpx solid red;
  box-sizing: border-box;
}*/
.bgcolor{
  width: 1128rpx;
  height:646rpx; 
  border-radius: 90%;
  position: absolute;
  top:-224rpx;
  left: -189rpx;
}
.logo{
  width: 444rpx;
  height: 153rpx;
  margin: 0px auto;
  padding-top: 200rpx;
}
.logo img{
  width: 100%;
  height: 100%;
}
/*手机号授权*/
.content{
 /* border:2rpx solid red;
  box-sizing: border-box;*/
  position: absolute;
  top:280rpx;
}
.mobile-phone-number-authorization{
  width:670rpx;
  height: 300rpx;
  margin:0rpx  40rpx;
  border-radius: 16rpx;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
  position: relative;
}
.phone-number{
  width:320rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-weight: 500;
  position: absolute;
  top: 90rpx;
  left:175rpx;
  text-align: center;
  color: #111111;
  box-shadow: 0rpx 8rpx 36rpx rgba(255,204,0,0.3);
}
.phone-tips{
  width: 100%;
  margin-top: 66rpx;
  text-align: center;
  position: absolute;
  bottom:40rpx;
  color: #525252;
  font-size: 26rpx;
}

/*主菜单部分*/
.main-nav{
  width: 100%;
  margin-top: 30rpx;
  padding: 0rpx 40rpx;
  /*position: absolute;
  top:710rpx;*/
  box-sizing: border-box;
}
.main-nav-top,.main-nav-bottom{
  width: 100%;

}
.today-order,.reserve-shop{
  width:320rpx;
  height: 198rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
  padding:34rpx 0rpx; 
  /*border:1rpx solid red;*/
  box-sizing:border-box;
}

.today-order img,.reserve-shop img{
  width:80rpx;
  height: 80rpx;
  margin: 0rpx 120rpx;
  
}
.today-order span,.reserve-shop span{
  display: block;
  color: #111111;
  font-size: 32rpx;
  text-align: center;
  font-weight: 500;
}
.main-nav-bottom .new-activity{
  margin-top: 20rpx;
  width: 669rpx;
  height:198rpx; 
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0rpx 8rpx 40rpx rgba(205,205,205,0.6);
  text-align: center;
  line-height: 198rpx
}
/*footer*/
.footer{
  width:750rpx;
  height: 98rpx;
  position: fixed;
  bottom: 0rpx;
  border-top:2rpx solid #e0e0e0;
  box-sizing: border-box;
}

.footer li{
  width:25%;
  height: 100%;
  text-align: center;
  color:#525252;
  padding:10rpx 40rpx;
  box-sizing: border-box;
}
.footer li:nth-of-type(1) img {
  width:41rpx;
  height: 49rpx;
}
.footer li:nth-of-type(2) img {
  width:60rpx;
  height: 48rpx;
}
.footer li:nth-of-type(3) img{
  width:44rpx;
  height: 48rpx;
}.footer li:nth-of-type(4) img {
  width:40rpx;
  height: 48rpx;
}
.footer li span{
  display: block;
  font-size: 20rpx;
  
}
.select{
  color: #111111;
}
</style>
