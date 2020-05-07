<!--suppress ALL -->
<template>
    <div v-if="show">
        <div class="weui-mask" @click="closeDialog" :style="{'zIndex': '8888'}"></div>
        <div class="weui-half-screen-dialog" :style="{'zIndex': '9999'}">
            <div class="weui-half-screen-dialog__hd">
                <div class="weui-half-screen-dialog__hd__side">
                    <div @click="closeDialog" class="weui-icon-btn weui-icon-btn_close">关闭</div>
                </div>
                <div class="weui-half-screen-dialog__hd__main">
                    <text class="weui-half-screen-dialog__title">分享拼团</text>
                </div>
<!--                <div class="weui-half-screen-dialog__hd__side">-->
<!--                    <div class="weui-icon-btn weui-icon-btn_more">更多</div>-->
<!--                </div>-->
            </div>
            <div class="weui-half-screen-dialog__bd">
                <div class="weui-half-screen-dialog__desc">{{shareText}}</div>
<!--                <div class="weui-half-screen-dialog__tips">辅助提示内容，可根据实际需要安排</div>-->
            </div>
            <div class="weui-half-screen-dialog__ft">
                <button type="default" class="weui-btn" open-type="share">发送给朋友</button>
                <button type="primary" class="weui-btn" @click="showSharePic">生成海报</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShareBox",
        props: ['show','shareText'],
        watch: {
            show (val) {
                console.log(val);
            }
        },
        methods :{
            closeDialog () {
                this.$emit('onClose')
            },
            showSharePic () {
                this.$emit('showSharePic')
            }
        },
        mounted() {

        },
        data () {
            return {
                buttons: [
                    {
                        type: 'default',
                        className: '',
                        text: '发送给朋友',
                        value: 0
                    },
                    {
                        type: 'primary',
                        className: '',
                        text: '生成海报',
                        value: 1
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .weui-half-screen-dialog__ft {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .weui-half-screen-dialog__ft button{
        font-size: 24rpx;
        margin: 0;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 80rpx;
    }
</style>
