<!--suppress ALL -->
<script>
    /* eslint-disable no-tabs */

    export default {
        watch: {

        },
        computed : {

        },
        onShow () {
            console.log('show tips');
        },
        // onShareAppMessage: function (res) {
        //     var that = this;
        //     return {
        //         title: '呵呵哈哈哈',
        //         path: '/pages/list/list?id=' + that.data.scratchId,
        //         success: function (res) {
        //             // 转发成功
        //
        //             that.shareClick();
        //         },
        //         fail: function (res) {
        //             // 转发失败
        //         }
        //     }
        // },
        created () {

            // 调用API从本地缓存中获取数据 1212
            console.log('========= mp app created =========');
        }
    }
</script>

<style>
    /*通用样式*/

    * {
        margin: 0rpx;
        padding: 0rpx;
    }

    .body {
        background-color: #f2f2f2;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .box-shadow {
        border-radius: 10rpx;
        box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
        box-sizing: border-box;
    }

    .clearfix {
        display: table;
        clear: both;
        content: "";
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .i-icon {
        display: block;
    }

    .span-inline {
        display: inline-block;
    }

    .span-block {
        display: block;
    }

    .btn {
        width: 180rpx;
        height: 50rpx;
        line-height: 50rpx;
        border-radius: 10rpx;
        display: inline-block;
    }

    .width710 {
        width: 710rpx;
    }

    .big-input {
        width: 460rpx;
        height: 40rpx;
        border-radius: 10rpx;
        border: 2rpx solid #cccccc;

    }

    /*样色样式*/

    .bgff {
        background-color: #ffffff;
    }

    .theme-color {
        background-color: #ffd000;
    }

    .color11 {
        color: #111111;
    }

    .color52 {
        color: #525252;
    }

    .color75 {
        color: #757575;
    }

    .color00 {
        color: #ffcc00;
    }

    /*部分tab 样式*/
    #tab_select ul li {
        height: 70rpx;
        line-height: 70rpx;
        float: left;
        background: #FFFFFF;
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
    }

    #tab_select ul li.tab_select_now {
        color: #FECE00;
    }

    .tab_content_now {
        display: block;
    }

    .input {
        float: left;
        padding: 0 15rpx;
        margin: 0 20rpx;
        border: 1rpx solid #f0f0f0;
        border-radius: 10rpx;
        font-size: 28rpx;
    }

    .send-date {
        height: 52rpx;
        border: 1rpx solid #f0f0f0;
        min-width: 182rpx;
        top: 2rpx;
        position: relative;
        vertical-align: middle;
        text-align: center;
        line-height: 52rpx;
        border-radius: 10%;
    }
</style>
