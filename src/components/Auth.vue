<!--suppress ALL -->
<template>
    <div id="toast_area" >
        <div id="toast">
            <div id="toast_title">
                授权登陆
            </div>
            <div id="toast_content">
                <img src="../../static/icons/aHome.jpg" alt="">
                <h3>青松易购 申请获得以下权限：</h3>
                <span>
                   获得你的公开信息（昵称、头像等）
                </span>
            </div>
            <div id="toast_bottom">
                <button  @click="closeAuth">
                    取消
                </button>
                <button  open-type="getUserInfo" @getuserinfo="getUserInfo">
                    登录
                </button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Auth',
        props: {
		    slug: {
		    	default: null,
                type: String
            }
        },
        onShow () {
            console.log('show', '------------');
        },
        mounted () {
            console.log('??????????????????');
        },
        methods: {
			closeAuth () {
                console.log('取下xxxxx');
                this.$emit('close')
            },
			async getUserInfo (e) {
                console.log('11111111111', this.model);
                let sessionKey = this.model.account.sessionKey;
                console.log(sessionKey, 'sessionKey');
                if (sessionKey) {
                    let result = await this.$command('USER_REGISTER', e);
                    console.log(result, 'resut');
                    if (result) {
                        this.$emit('close');
                        if (this.slug === 'payment') {
                            this.$emit('pay')
                        }
                    }
                } else {
                    wx.showToast({
                        title: '授权失败,请退出小程序后再试',
                        icon: 'none',
                        duration: 2000
                    })
                }

			}
        }
	}
</script>

<style scoped>
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
        color: #69B35F;
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
