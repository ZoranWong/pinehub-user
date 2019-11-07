<!--suppress ALL -->
<template>
    <div id="feedBack">
        <CustomHeader :title="title" :needReturn="true" />
        <div id="feedBackContent">
            <textarea placeholder-class="placeholder-class" v-model="feedBackContent" placeholder="输入您宝贵的意见（500字以内）" :maxlength="totalFont" />
            <em>{{nowFontNum}}/{{totalFont}}</em>
        </div>
        <input v-model="contact" placeholder-class="placeholder-class" id="feedBackMobile" placeholder="手机号码（选填）" />
        <div id="btn" @click="submit">立即提交</div>
    </div>
</template>

<script>
	import CustomHeader from '../../../components/CustomHeader';
	export default {
        components: {
			CustomHeader
        },
        data () {
            return {
                title: '意见反馈',
                navName: 'feedBack',
                feedBackContent: null,
                totalFont: 500,
                contact: null
            };
        },
        computed: {
            nowFontNum () {
                return this.feedBackContent ? this.feedBackContent.length : 0;
            }
        },
        methods: {
            submit () {
                this.$command('SUBMIT_FEED_BACK', this.contact, this.feedBackContent)
            }
        },
        mounted () {
            this.contact = null;
            this.feedBackContent = null;
        },
        created () {

        }
    }
</script>

<style scoped>
    #feedBack {
        position: absolute;
        height: 100%;
        width: 100%;
        background: #f2f2f2;
    }

    #feedBackContent {
        background: #fff;
        margin-top: 20rpx;
        width: 750rpx;
        font-size: 32rpx;
        font-weight: 300;
        padding: 15rpx;
        box-sizing: border-box;
        color: #111111;
        line-height: 46rpx;
        position: relative;
    }

    #feedBackContent em {
        position: absolute;
        right: 15rpx;
        bottom: 15rpx;
        background: #f5f5f5;
        padding: 3rpx 8rpx;
        border-radius: 20rpx;
        font-size: 28rpx;
    }

    #feedBackMobile {
        background: #fff;
        margin: 10rpx 0;
        width: 750rpx;
        font-size: 32rpx;
        font-weight: 300;
        padding: 15rpx;
        color: #111111;
        line-height: 78rpx;
    }

    .placeholder-class {
        font-size: 32rpx;
        font-weight: 300;
        color: #828282;
    }

    #btn {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FECE00;
        font-size: 34rpx;
        font-weight: 300;
        text-align: center;
        border-radius: 10rpx;
        color: #111111;
        margin: 20rpx 15rpx;
    }
</style>
