<!--suppress ALL -->
<template>
    <div class="share_pic" v-if="show" :style="{'zIndex': 8888}">


        <canvas canvas-id="canvas" :style="{width: width + 'px', height: height+'px',background: '#fff', borderRadius: '25rpx'}"></canvas>
        <button class="save" @click="onImgOk">保存图片</button>
    </div>
</template>

<script>
    export default {
        name: "SharePic",
        props: ['show', 'text', 'name', 'id', 'pic'],
        data() {
            return {
                code: '',
                gateway: '',
                image: '',
                width: 270,
                height: 445
            }
        },
        canvasOptions: {
            canvasId: 'canvas'
        },
        renderCanvas (h) {
            console.log(h, '(((((((((');
            if (!this.name) {
                return h('view', [])
            };
            return h('view', {
                style: {
                    width: 270,
                    height: 445,
                    fill: '#ffffff',
                }
            }, [
                h('image', {
                    props: {
                        src: this.pic
                    },
                    style: {
                        left: 15,
                        top: 15,
                        width: 240,
                        height: 240
                    }
                }),
                h('text', {
                    style: {
                        left: 15,
                        top: 270,
                        fill: '#111',
                        fontSize: 20,
                        ellipse: true,
                        zIndex: 999999
                    }
                }, this.name),
                h('text', {
                    style: {
                        left: 15,
                        top: 298,
                        fill: '#757575',
                        fontSize: 12,
                        width: '430rpx',
                        wordBreak: 'break-all'
                    }
                }, this.text),
                h('image', {
                    props: {
                        src: 'https://kingdomcloud.oss-cn-hangzhou.aliyuncs.com/mp_images/txt.png'
                    },
                    style: {
                        left: 15,
                        top: 375,
                        width: 140,
                        height: 35
                    }
                }),
                h('image', {
                    props: {
                        src: this.image
                    },
                    style: {
                        left: 180,
                        top: 357,
                        width: 75,
                        height: 75
                    }
                }),
            ])
        },
        watch: {
            show (val) {
                if (val) {
                    let path = 'pages/activities/groupon/grouponDetails/main';
                    this.image = `${this.gateway}/wxa/getwxacode?scene=id=${this.id}&page=${path}`;
                }
            }
        },
        methods: {

            onImgOk () {
                let self= this;
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: 270,
                    height: 445,
                    canvasId: 'canvas',
                    success: function(res) {
                        console.log(res, '==========>>>>>>>');
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success (res) {
                                wx.showToast({
                                    title: '保存图片成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                self.$emit('onClose')
                            }

                        })
                    }
                })

            },
        },
        mounted() {
            this.gateway = this.config['app']['http']['gateway'];
            // let ctx = wx.createCanvasContext('canvas');
            // ctx.rect(0, 0, 270, 445);
            // ctx.setFillStyle('white')
            // ctx.fill();
            // ctx.draw();
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
        bottom: 110rpx;
        left: 210rpx;
    }
</style>
