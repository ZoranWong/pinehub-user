<!--suppress ALL -->
<template>
    <div id="feedBack">
        <CustomHeader :title="title" :needReturn="false" />

        <div id="feedBackSuccess">
            <div class="bgimg"></div>
            <em>提交成功</em>
            <i>感谢您对快乐松的关注与支持，我们会认证处理您的反馈，尽快修复和完善相关功能。</i>
        </div>
        <div id="btn" @click="submit">完成</div>
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import CustomHeader from '../../../../components/CustomHeader';
    export default {
        components: {
			CustomHeader
        },
        data () {
            return {
                title: '意见反馈',
                navName: 'feedback'
            };
        },
        computed: {

        },
        methods: {
            jump (router) {
                this.$command('REDIRECT_TO', router, 'replace');
            },

            submit () {
                this.jump('userCenter');
            }
        },
        created () {

        }
    }
</script>

<style scoped>
    #feedBack {
        background: #f1f2f3;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #feedBackSuccess {
        font-size: 32rpx;
        font-weight: 300;
        color: #111111;
        margin-top: 130rpx;
    }

    #feedBackSuccess .bgimg {
        display: block;
        background: url(../../../../../static/images/icon/feedBackSuccess.png) no-repeat center center;
        background-size: 148rpx 148rpx;
        width: 148rpx;
        height: 148rpx;
        margin: 0 auto;
        padding: 5rpx;
    }

    #feedBackSuccess em {
        text-align: center;
        font-size: 30rpx;
        font-weight: 400;
        margin-top: 30rpx;
    }

    #feedBackSuccess i {
        font-size: 24rpx;
        margin: 20rpx 130rpx 140rpx;
        text-align: center;
        line-height: 36rpx;
    }

    #btn {
        background: #FECE00;
        font-size: 34rpx;
        font-weight: 300;
        text-align: center;
        color: #111111;
        line-height: 78rpx;
        margin: 15rpx;
        border-radius: 15rpx;
    }
</style>
