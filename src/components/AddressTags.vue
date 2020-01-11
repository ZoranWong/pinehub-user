<!--suppress ALL -->
<template>
    <div class="tabBox">
        <div class="tagContainer">
            <div class="tagHeader">
                <h4>选择地址标签</h4>
                <i class="iconfont" @click="closeModal">&#xe646;</i>
            </div>
            <ul class="tags" >
                <li class="custom">
                    <div class="left">
                        <span class="icon" v-if="name">{{name[0]}}</span>
                        <i class="iconfont" v-else>&#xe7d5;</i>
                        <input
                            type="text"
                            :placeholder="placeholder"
                            v-model="name"
                            maxlength="10"
                            @blur="hideClear"
                            @focus="showClear"
                        >
                        <div class="tips" v-if="tips">
                            <span class="tip">最多10个字符</span>
                            <i class="iconfont" @click.stop="clear">&#xe658;</i>
                        </div>
                    </div>
                    <div class="right">
                        <i class="iconfont">&#xe645;</i>
                    </div>
                </li>
                <li>
                    <i class="iconfont yellow">&#xe80b;</i>
                    <span>家</span>
                </li>
                <li>
                    <i class="iconfont blue">&#xe80b;</i>
                    <span>公司</span>
                </li>
                <li>
                    <i class="iconfont green">&#xe80b;</i>
                    <span>学校</span>
                </li>
            </ul>
            <div class="submitBtn">
                <button @click="saveCustom">完成</button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'AddressTags',
        props: ['tagName'],
        data(){
		    return {
                name: '',
                tips: false,
                placeholder: '默认显示姓名,可输入自定义标签'
            }
        },
        watch: {

        },
        methods: {
            showClear () {
                this.tips = true;
                this.placeholder = '';
            },
            hideClear () {
                this.tips = false;
                this.placeholder = '默认显示姓名,可输入自定义标签'
            },
            clear () {
                this.name = ''
            },
            closeModal () {
                this.$emit('close')
            },
            saveCustom () {
                if (this.name) {
                    this.$emit('save',this.name)
                }
            }
        },
        computed : {

        },
        mounted () {
            this.name = this._props.tagName
        }
    }
</script>

<style>
    .tabBox{
        width: 750rpx;
        height: 1624rpx;
        background:rgba(17,17,17,0.3);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        box-sizing: border-box;
    }

    .tagContainer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 820rpx;
        background: #fff;
        border-top-left-radius: 16rpx;
        border-top-right-radius: 16rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        transition: 3s;
    }

    .tagHeader{
        width: 100%;
        height: 86rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 40rpx;
    }

    .tagHeader h4 {
        font-size: 28rpx;
        color: #111;
    }

    .tagHeader .iconfont{
        position: absolute;
        right: 0;
    }

    .tags{
        transition: 3s;
    }

    .tags li {
        width: 100%;
        height: 126rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .tags li .iconfont{
        font-size: 66rpx;
    }

    .yellow {
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    .blue {
        background: linear-gradient(to right,#5EC4F9,#34B5F8);
        -webkit-background-clip: text;
        color: transparent;
    }

    .green {
        background: linear-gradient(to right,#97EF66,#83DF50);
        -webkit-background-clip: text;
        color: transparent;
    }

    .tags li span{
        font-size: 28rpx;
        color: #111;
        margin-left: 22rpx;
    }

    .tags .custom{
        justify-content: space-between;
    }

    .tags .custom .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }

    .tags .custom .left .tips{
        position: absolute;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .tags .custom .left .tips .tip{
        font-size: 26rpx;
        color: #ccc;
        margin-right: 20rpx;
        transform: translateY(-2rpx);
    }

    .tags .custom .left .tips .iconfont{
        font-size: 28rpx;
        color: #ccc;
        cursor: pointer;
        z-index: 999999;
    }

    .tags .custom .left .icon{
        display: flex;
        width: 66rpx;
        height: 66rpx;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: linear-gradient(to right, #e7e7e7, #cdcdcd);
        color: #fff;
        margin-left: 0;
        font-size: 30rpx;
    }

    .tags .custom .left input{
        margin-left: 20px;
        width: 420rpx;
        font-size: 26rpx;
        color: #111;
        border-bottom: 2rpx solid #f2f2f2;
        z-index: 1000;
    }

    .tags .custom .right .iconfont {
        font-size: 26rpx;
        color: #FFCC00;
    }

    .submitBtn{
        width: 100%;
        height: 80rpx;
        margin-top: 70rpx;
    }

    .submitBtn button {
        width: 100%;
        height: 100%;
        background: #FFCC00;
        border-radius: 10rpx;
    }

</style>
