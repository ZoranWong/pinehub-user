<template>
    <div id="bindShop">
        <div id="bindShopContainer">
            <h4>请输入店铺编号</h4>
            <input type="number" v-model="code" placehoplder="'请输入店铺编号">
            <div class="bottom">
                <button @click="close">取消</button>
                <button @click="submit">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'BindShop',
        data () {
		    return {
                code: ''
            }
        },
        methods: {
            submit () {
                if (!this.code) return;
                this.$emit('submit', this.code)
            },
            close () {
                this.$emit('close')
            }
        }
	}
</script>

<style scoped>
    #bindShop{
        position: fixed;
        width: 100vw;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    #bindShopContainer{
        width: 70%;
        height: 20%;
        background: #fff;
        padding: 20rpx 5rpx;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    #bindShopContainer h4{
        width: 100%;
        font-size: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40rpx;
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 20rpx;
    }

    #bindShopContainer input {
        height: 20rpx;
        border: 2rpx solid #f2f2f2;
        width: 80%;
        color: #757575;
        font-size: 32rpx;
        padding: 0 20rpx;
    }

    #bindShopContainer .bottom{
        width: 100%;
        height: 60rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-top: 2rpx solid #f2f2f2;
    }

    #bindShopContainer .bottom button {
        flex: 1;
        height: 60rpx;
        background: #fff;
        font-size: 32rpx;
        padding: 0;
    }
</style>
