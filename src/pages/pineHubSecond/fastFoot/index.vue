<!--suppress CssInvalidPropertyValue -->
<template>
    <div class="fast-foot-list">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
           <div class="back-icon" @click="backPage"><img src="../img/back.png" alt=""></div>
        </div>
        <div class="fast-foot-title" :style="{'marginTop': '-'+imgHeight + 'px'}">
            <img src="../img/headImg.jpg" alt="">
        </div>
        <div class="shop-info-show">
            <div class="shop-one">
                <div class="content-word">吉事多便利店（置地广场店）</div>
                <div class="head-img"><img src="../img/headImg.jpg" alt=""></div>
            </div>
            <div class="shop-two">
                <div class="position-img"><img src="../img/position.png" alt=""></div>
                <div class="content-word">政务区置地广场吉事多便利店</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Public from "../js/Public";
    export default {
        mixins:[Public],
        data() {
            return {
            };
        },
        methods:{
            backPage:function () {
                this.$command('REDIRECT_TO', '', 'back')
            }
        }
    }
</script>

<style scoped>
    .fast-foot-title{
        width: 100%;
        height: 400rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .fast-foot-title img{
        width: 100%;
        height: 100%;
        filter: blur(10rpx);
    }
    #nav_bar{
        width: 100%;
        display: table;
        padding-top: 14rpx;
    }
    .back-icon{
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(17,17,17,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 100;
        float: left;
    }
    .back-icon ._img{
        width: 32rpx;
        height: 32rpx;
    }
    .shop-info-show{
        width:96%;
        height:200px;
        left: 2%;
        top:110px;
        background:rgba(255,255,255,1);
        box-shadow:0 0 10px 0 rgba(204,204,204,0.6);
        border-radius:12.5px;
        position: absolute;
        border: 1px solid;
    }
    .shop-info-show>._div{
        width: 100%;
    }
    .shop-one{
        height: 45px;
    }
    .shop-one .content-word{
        font-size:20px;
        font-family:PingFang-SC-Heavy,PingFang-SC;
        font-weight:800;
        color:rgba(17,17,17,1);
        padding-top: 15px;
        padding-left: 15px;
        float: left;
    }
    .shop-one .head-img{
        width:54px;
        height:54px;
        float: right;
        padding-right: 15px;
        margin-top: -10px;
    }
    .shop-one .head-img ._img{
        width:100%;
        height:100%;
        border-radius: 7px;
    }
    .shop-two{
        height: 30px;
        justify-content: left;
        align-items: center;
        display: flex;
        padding-left: 15px;
    }
    .shop-two .content-word{
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .shop-two .position-img{
        width:12px;
        height:12px;
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        justify-content: center;
        align-items: center;
        display: flex;
        margin-right: 10px;
    }
    .shop-two .position-img ._img{
        width: 100%;
        height: 100%;
    }
</style>
