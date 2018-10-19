<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
/*通用样式*/
*{
  margin:0rpx;
  padding:0rpx;
}
.body{
   background-color: #fafafa;
 }
.box-shadow{
  border-radius: 10rpx;
  box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
  box-sizing: border-box;
}
.clearfix{
  display: table;
  clear: both;
  content: "";
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.i-icon{
  display:block;
}
.btn{
  width:180rpx;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 10rpx;
  display: inline-block;
}
.width710{
  width:710rpx;
}
/*样色样式*/

.bgff{
  background-color: #ffffff;
}
.bgfa{
  background-color: #fafafa;
}
.theme-color{
  background-color: #fece00;
}
.text-color-11{
  color: #111111;
}
.text-color-52{
  color:#525252;
}
.text-color-75{
  color: #757575;
}
.text-yellow-cf{
  color:#ffcf00;
}
.text-yellow-cc{
  color:#ffcc00;
}
</style>
