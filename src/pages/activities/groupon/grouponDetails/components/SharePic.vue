<!--suppress ALL -->
<template>
    <div class="share_pic" v-if="show" :style="{'zIndex': 8888}" @click="close">

        <canvas @click.stop="stop" :canvas-id="canvasId" :id="'group_'+id" :style="{width: width + 'rpx', height: height+'rpx',background: '#fff', borderRadius: '25rpx'}"></canvas>
        <button class="save" @click.stop="onImgOk">保存图片</button>
    </div>
</template>

<script>
    import {Render} from '../core/index'
    import {constants, Canvas} from '../core/utils'
    export default {
        name: "SharePic",
        props: ['show', 'text', 'name', 'id', 'pic'],
        data() {
            return {
                code: '',
                gateway: '',
                image: '',
                width: 540,
                height: 890,
                renderInstance: null,
                render: null
            }
        },
        computed: {
          canvasId () {
              return 'canvas_'+this.id
          }
        },
        watch: {
            show (val) {
                if (val) {

                    let path = 'pages/activities/groupon/grouponDetails/main';
                    this.image = `${this.gateway}/wxa/getwxacode?scene=id=${this.id}&page=${path}`;
                    this.renderInstance = new Canvas(this.width, this.height, this.canvasId)
                    this.updateCanvas()

                }
            },
            canvasId () {

            }
        },
        methods: {
            close () {
                this.$emit('onClose')
            },
            stop () {

            },
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
            renderCanvas (h) {
                if (!this.name) {
                    return h('view', [])
                };
                let text = this.text;
                if (text.length > 20) {
                    let text_front = text.substring(0,20);
                    let text_behind = text.substring(20);
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
                            }
                        }, text_front),
                        h('text', {
                            style: {
                                left: 15,
                                top: 315,
                                fill: '#757575',
                                fontSize: 12,
                            }
                        }, text_behind),
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
                } else {
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
                }

            },
            updateCanvas() {
                constants.scrollTop += constants.top
                let vnode = this.renderCanvas.call(this._renderProxy, this.$createElement)
                this.render = new Render(this.renderInstance, vnode, this.width, this.height)
                this.render.vnode2canvas()
                // console.log(constants.IN_BROWSER);
                // this.renderInstance.add(offScreenCanvas)
                // return vnode
            },
        },
        onHide() {
            if(this.render) {
                this.render.clearCanvas();
                this.render = null;
            }
            this.renderInstance = null;
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
