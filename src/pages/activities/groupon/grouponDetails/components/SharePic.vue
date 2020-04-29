<!--suppress ALL -->
<template>
    <div class="share_pic" v-if="show">
        <div class="share_content">
            <img src="../img/background.jpeg" alt="">
            <h3>青松功夫缤纷蛋糕大血拼</h3>
            <h4>
                青松功夫超值团购，参团即可享受令人羡
                慕的优惠哦！
            </h4>
            <div class="code">
                <img class="text" src="../img/txt.png" alt="">
                <img class="codeImg" src="../img/code.jpg" alt="">
            </div>
            <button class="save" @click="downloadCodeImg">保存图片</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SharePic",
        props: ['show'],
        data() {
            return {

            }
        },
        methods: {
            downloadCodeImg () {
                wx.getImageInfo({
                    src: 'http://img5.imgtn.bdimg.com/it/u=3686777643,1691061762&fm=11&gp=0.jpg',
                    success: function(data) {
                        let path = data.path;
                        wx.saveImageToPhotosAlbum({
                            filePath: path,
                            success: () => {
                                that.showSuccess("保存图片成功！");
                            },
                            fail: () => {
                                that.showModal("保存图片", "保存图片失败！");
                            }
                        });
                    },
                fail: () => {
                    that.showModal("获取图片", "获取图片失败！");
                }
            })}
        }
    }
</script>

<style scoped>
    .share_pic{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(17,17,17,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .share_content{
        width:540rpx;
        height:890rpx;
        background:rgba(255,255,255,1);
        border-radius:25rpx;
        padding: 30rpx;
        box-sizing: border-box;
        position: relative;
    }

    .share_content>img{
        width: 480rpx;
        height: 480rpx;
        margin-bottom: 20rpx;
    }

    .share_content h3{
        font-size: 40rpx;
        color: #111;
        font-weight: normal;
    }

    .share_content h4{
        font-size: 24rpx;
        color: #757575;
        font-weight: normal;
        margin-top: 19rpx;
    }

    .share_content .code{
        padding: 26rpx 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 30rpx;
        border-top: 1rpx dashed #F2F2F2;
        margin-bottom: 26rpx;
    }

    .share_content .code .text{
        width: 280rpx;
        height: 71rpx;
    }

    .share_content .code .codeImg{
        width: 150rpx;
        height: 150rpx;
    }

    .share_pic .save{
        width:330rpx;
        height:80rpx;
        border:2px solid rgba(255,255,255,1);
        border-radius:40rpx;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border-color: #fff;
        color: #fff;
        position: absolute;
        bottom: -110rpx;
        left: 100rpx;
    }
</style>
