<!--suppress ALL -->
<template>
    <div id="toast_area" >
        <div id="toast">
            <div id="toast_title">
                用户授权登陆
            </div>
            <div id="toast_content">
                <div id="toast_content_info">
                    <div id="input_change_info">
                        尊敬的快乐松用户，我们需要您授权登录！
                    </div>
                    <form report-submit="true" @submit="uploadFormId" class="form_btn">
                        <button form-type="submit" id="input_change_btn_primary" @click="closeAuth">
                            取消
                        </button>
                        <button form-type="submit" id="input_change_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
                            登录
                        </button>
                    </form>
<!--                    <div id="input_change_tips">-->
<!--                        注：小程序获取用户信息后才可正常使用-->
<!--                    </div>-->
                </div>
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
        mounted () {
		},
        methods: {
			async uploadFormId (e) {
				let formId = e.mp.detail.formId;
				if (formId !== "the formId is a mock one"){
					await this.http.account.saveFormId(formId);
				} else {
					console.log('form id 不合法')
				}
			},
			closeAuth () {
				this.$emit('close')
            },
			getPhoneNumber (e) {
				this.$command('SET_USER_MOBILE', e);
			},
			async getUserInfo (e) {
                let sessionKey = this.model.account.sessionKey;
                if (sessionKey) {
                    let result = await this.$command('USER_REGISTER', e);
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

<style>
    #toast_area {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
    }

    #toast {
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
    }

    #toast_title {
        background: #FECE00;
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 34rpx;
        font-weight: 400;
    }

    #toast_content {
    }

    #toast_content_info {
        padding: 20rpx 40rpx;
    }

    #input_change_info {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        margin-bottom: 20rpx;
    }


    #input_change_btn {
        display: inline-block;
        background: #FECE00;
        line-height: 78rpx;
        text-align: center;
        font-size: 34rpx;
        font-weight: 400;
        border-radius: 10rpx;
        margin-left: 20rpx;
        color: #fff;
        margin-top: 20rpx;
    }

    #input_change_btn_primary{
        display: inline-block;
        background: #fff;
        line-height: 78rpx;
        text-align: center;
        font-size: 34rpx;
        font-weight: 400;
        border-radius: 10rpx;
        margin-right: 20rpx;
        border: 1rpx solid #ffcc00;
        margin-left: 120rpx;
        color: #FFC000;
        margin-top: 20rpx;
    }

    #input_change_tips {
        font-size: 22rpx;
        font-weight: 300;
        color: #828282;
        text-align: center;
        line-height: 68rpx;
    }
</style>
