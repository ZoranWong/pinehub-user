<!--suppress ALL -->
<template>
    <div v-if="show">
        <div class="weui-mask" @click="closeDialog"></div>
        <div class="weui-half-screen-dialog">
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
<!--            <div class="weui-half-screen-dialog__bd">-->
<!--                <div class="weui-half-screen-dialog__desc">辅助描述内容，可根据实际需要安排</div>-->
<!--                <div class="weui-half-screen-dialog__tips">辅助提示内容，可根据实际需要安排</div>-->
<!--            </div>-->
            <div class="weui-half-screen-dialog__ft">
                <button type="default" class="weui-btn">发送给朋友</button>
                <button type="primary" class="weui-btn">生成海报</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShareBox",
        props: ['show'],
        watch: {
            show (val) {
                console.log(val);
            }
        },
        methods :{
            closeDialog () {
                this.$emit('onClose')
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

</style>
