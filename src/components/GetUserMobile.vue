<!--suppress ALL -->
<template>
    <div id="toast_area" >
        <div id="toast">
            <div id="toast_title">
                微信手机号授权
            </div>
            <div id="toast_content">
                <img src="../../static/icons/aHome.jpg" alt="">
                <h3>青松易购 申请获得你的手机号：</h3>
                <span>
                    我们需要您的手机号来创建账
号，累计积分
                </span>
            </div>
            <div id="toast_bottom">
                <button  @click="closeMobile">
                    取消
                </button>
                <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                    登录
                </button>
            </div>
        </div>
    </div>

</template>

<script>
	export default {
        name: 'GetUserMobile',
        methods: {
            async uploadFormId (e) {
                let formId = e.mp.detail.formId;
                if (formId !== "the formId is a mock one"){
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
            getPhoneNumber (e) {
                this.$command('SET_USER_MOBILE', e);
            },
            closeMobile () {
                this.$emit('close');
            },
        }
	}
</script>

<style>
    #toast_area {
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 100000;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #toast {
        background: #FFFFFF;
        width: 630rpx;
        border-radius: 10rpx;
    }

    #toast_title {
        width: 100%;
        height: 120rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        color: #111;
        font-weight: bold;
        border-bottom: 2rpx solid #f2f2f2;
    }

    #toast_content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #toast_content img {
        width: 80rpx;
        height: 80rpx;
        margin: 20rpx 0;
    }

    #toast_content h3{
        width: 530rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #111;
        padding-bottom: 35rpx;
        border-bottom: 2rpx solid #f2f2f2;
    }

    #toast_content span{
        width: 100%;
        word-break: break-all;
        font-size: 32rpx;
        color: #757575;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 100rpx;
        margin-top: 30rpx;
        margin-bottom: 55rpx;
    }

    #toast_content span:before{
        content: '';
        position: absolute;
        width: 20rpx;
        height: 20rpx;
        background: #ccc;
        border-radius: 50%;
        left: 50rpx;
        top: 16rpx;
    }


    #toast_bottom{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top: 2rpx solid #f2f2f2;
    }

    #toast_bottom button{
        flex: 1;
        height: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
        background: #fff;
    }

    #toast_bottom button:last-child{
        color: #69B35F;
        border-left: 2rpx solid #f2f2f2;
    }

</style>
