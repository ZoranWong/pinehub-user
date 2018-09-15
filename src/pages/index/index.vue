<template>
<<<<<<< HEAD
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
=======
	<div id="index">
		<div id="index_header">
			<div id="index_logo"></div>
		</div>
		<div id="index_mobile">
			<span id="index_getmobile">
		  		手机号授权
		  	</span>
			<em id="index_tips">
		  		我们需要您的手机号来创建账号，累计积分
		  	</em>
		</div>
		<div id="index_menu">
			<dl>
				<dd>
					<img src="../../../static/images/todaysorder.png" />
				</dd>
				<dt>当日下单</dt>
			</dl>
			<dl>
				<dd>
					<img src="../../../static/images/prearrangedmall.png" />
				</dd>
				<dt>预定商城</dt>
			</dl>

		</div>
		<footer-nav :navName="navName"></footer-nav>
	</div>

</template>

<script>
	import FooterNav from '@/components/FooterNav';

	export default {
		components: {
			'footer-nav': FooterNav
		},
		data() {
			return {
				navName: "index"
			};
		},
		created() {}
	}
</script>

<style scoped>
	#index {
		background: #fafafa;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	
	#index_header {
		height: 402rpx;
		width: 1228rpx;
		/*margin: -1200rpx auto 0;*/
		margin-left: -239rpx;
		background: #fece00;
		border-radius: 0 0 100% 100%;
		overflow: hidden;
	}
	
	#index_logo {
		background: url(../../../static/images/logo.png) no-repeat top center;
		background-size: 100%;
		/*background: #666;*/
		width: 342rpx;
		height: 116rpx;
		margin: 94rpx auto 0;
	}
	/*#index_face{
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		background: #FFFFFF;
		margin: 60rpx auto 0;
		overflow: hidden;
	}*/
	
	#index_mobile {
		background: #fff;
		height: 300rpx;
		width: 670rpx;
		margin: 0 auto;
		margin-top: -90rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}
	
	#index_getmobile {
		height: 80rpx;
		width: 320rpx;
		text-align: center;
		line-height: 80rpx;
		background: #FECE00;
		display: block;
		margin: 90rpx auto 0;
		font-size: 32rpx;
		font-weight: 200;
		border-radius: 80rpx;
		box-shadow: 0 10rpx 10rpx #fff6bd;
	}
	
	#index_tips {
		text-align: center;
		font-size: 26rpx;
		font-weight: 200;
		margin-top: 46rpx;
		color: #525252;
	}
	
	#index_menu {
		padding: 30rpx 40rpx 0;
	}
	
	#index_menu dl {
		width: 320rpx;
		height: 198rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 10rpx #f1f1f1;
		float: left;
	}
	
	#index_menu dl:nth-child(2) {
		margin-left: 30rpx;
	}
	
	#index_menu dl dd {
		padding-top: 40rpx;
	}
	
	#index_menu dl dd img {
		display: block;
		width: 76rpx;
		height: 76rpx;
		margin: 0 auto;
	}
	
	#index_menu dl dt {
		font-size: 30rpx;
		font-weight: 400;
		color: #111111;
		text-align: center;
		margin-top: 15rpx;
	}
	
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
>>>>>>> 07130b95d588a260b3f4d6dc361f14673c6ddd7b
