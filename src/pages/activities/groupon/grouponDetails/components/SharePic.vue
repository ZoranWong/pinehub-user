<!--suppress ALL -->
<template>
    <div class="share_pic" v-if="show" :style="{'zIndex': 8888}">
        <div class="share_content" :style="{'zIndex': 9999}">
            <img src="../img/background.jpeg" alt="">
            <h3>{{name}}</h3>
            <h4>
                {{text}}
            </h4>
            <div class="code">
                <img class="text" src="../img/txt.png" alt="">
                <img v-if="show" class="codeImg" :src='image' alt="">
            </div>
            <button class="save" @click="downloadCodeImg">完成</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SharePic",
        props: ['show', 'text', 'name', 'id'],
        data() {
            return {
                code: '',
                gateway: '',
                image: '',
            }
        },
        watch: {
            show (val) {
                if (val) {
                    this.image = `${this.gateway}/wxa/getwxacode?scene=id=${this.id}`
                }
            }
        },
        methods: {
            downloadCodeImg () {
                this.$emit('onClose')
            },
            onImgOk () {
                console.log('ok');
            }
        },
        mounted() {
            this.gateway = this.config['app']['http']['gateway'];
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
