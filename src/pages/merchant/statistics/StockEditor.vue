<!--suppress ALL -->
<template>
    <div v-show="display" id="toast_area">
        <div id="toast">
            <i id="toast_clost" @click="toastClose"></i>
            <div id="toast_title">
                修改库存
            </div>
            <div id="toast_content">
                <div id="toast_content_info">
                    <div id="input_change">
                        <div class="input_num">
                            {{merchandise['stockNum']}}
                        </div>
                        <input class="input_num input_num_right" type="number" v-model="productInfo.newStockNum"/>
                    </div>
                    <div id="input_change_info">
                        修改原因
                    </div>
                    <div id="input_change_list">
                        <ul>
                            <li v-for="(item,index) in selectCause" :key="item.id"
                                :class="{input_now_select:radioCur == index}" @click="radioSelect(index,item.id)">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div id="input_change_btn"
                         @click="returnBtn(merchandise['id'], merchandise['stockNum'], productInfo['newStockNum'], productInfo['reason'], comment)">
                        确认修改
                    </div>
                    <div id="input_change_tips">
                        注：因后期核实需要请您如实填写
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Toast',
        props: {
            'merchandise': {
                default: {},
                type: Object
            },
            'display': {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                selectCause: [{
                    'id': 0,
                    'name': '商品损坏'
                }, {
                    'id': 1,
                    'name': '商品丢失'
                }, {
                    'id': 2,
                    'name': '商品过期'
                }],
                radioCur: 0,
                productInfo: {},
                comment: '默认'
            }
        },
        watch: {},
        methods: {
            radioSelect(num, id) {
                this.radioCur = num;
                this.productInfo['changeAnswerId'] = id;
                this.productInfo['reason'] = this.selectCause[num]['name'];
            },
            returnBtn(id, primaryStockNum, modifyStockNum, reason, comment) {
                modifyStockNum = parseInt(modifyStockNum);
                if (isNaN(modifyStockNum) || modifyStockNum < 0) {
                    wx.showToast({
                        title: '正确填写库存',
                        icon: 'none'
                    })
                } else if (modifyStockNum === this.merchandise['stockNum']) {
                    wx.showToast({
                        title: '库存没有任何改变',
                        icon: 'none'
                    })
                } else {
                    wx.showLoading({
                        title: '正在提交...'
                    });
                    this.$emit('modifyStock', id, primaryStockNum, modifyStockNum, reason, comment);
                    this.productInfo = {};
                    this.productInfo['reason'] = this.selectCause[0]['name'];
                    this.radioCur = 0;
                    this.$emit('close');
                }
            },
            toastClose() {
                this.$emit('close');
            }
        },
        created() {
            this.productInfo['reason'] = this.selectCause[0]['name'];
            this.productInfo['changeAnswerId'] = this.radioCur;
        },
        beforeUpdate() {
            // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
        }
    }
</script>

<style scoped>
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
        width: 620 rpx;
        border-radius: 10 rpx;
        top: 100 rpx;
        left: 65 rpx;
    }

    #toast_clost {
        position: absolute;
        height: 78 rpx;
        width: 78 rpx;
        background: url(../../../../static/images/icon/my_toast_close.png) no-repeat center center;
        background-size: 100%;
        right: -14 rpx;
        top: -20 rpx;
    }

    #toast_title {
        background: #FECE00;
        text-align: center;
        line-height: 96 rpx;
        border-radius: 10 rpx 10 rpx 0 0;
        font-size: 34 rpx;
        font-weight: 400;
    }

    #toast_content {
    }

    #toast_content_info {
        padding: 20 rpx 40 rpx;
    }

    #input_change {
        overflow: hidden;
        margin-bottom: 20 rpx;
        background: url(../../../../static/images/icon/my_toast_arrow.png) no-repeat center center;
        background-size: 52 rpx;
    }

    .input_num {
        display: inline-block;
        border: 1px solid #828282;
        width: 160 rpx;
        line-height: 66 rpx;
        height: 66 rpx;
        text-align: center;
        border-radius: 10 rpx;
        float: left;
    }

    .input_num.input_num_right {
        float: right;
    }

    #input_change_info {
        font-size: 32 rpx;
        font-weight: 300;
        color: #111111;
        margin-bottom: 20 rpx;
    }

    #input_change_list ul li {
        line-height: 78 rpx;
        border-radius: 10 rpx;
        box-shadow: 0 rpx 2 rpx 5 rpx rgba(204, 202, 202, .6);
        margin-bottom: 20 rpx;
        text-align: center;
        font-size: 32 rpx;
        font-weight: 400;
        color: #111111;
        background: url(../../../../static/images/icon/my_select_none.png) no-repeat;
        background-size: 44 rpx;
        background-position: 40 rpx center;
    }

    #input_change_list ul li.input_now_select {
        background: url(../../../../static/images/icon/my_select_ok.png) no-repeat;
        background-size: 44 rpx;
        background-position: 40 rpx center;
    }

    #input_change_btn {
        background: #FECE00;
        line-height: 78 rpx;
        text-align: center;
        font-size: 34 rpx;
        font-weight: 400;
        border-radius: 10 rpx;
    }

    #input_change_tips {
        font-size: 22 rpx;
        font-weight: 300;
        color: #828282;
        text-align: center;
        line-height: 68 rpx;
    }
</style>
