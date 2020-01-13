<!--suppress ALL -->
<template>
    <div class="addressManage">
        <CustomHeader :title="title" :needReturn="true" />
        <div class="address-list" v-if="addresses.length">

        </div>
        <div v-else class="empty-list">
            <img src="./empty_point.jpg" alt="">
            <span>你还没有收货地址哦~</span>
        </div>
        <div class="addAddress">
            <button @click="jump('user.addressOperation')">
                新增收货地址
            </button>
        </div>
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	export default {
		components: {
			CustomHeader
		},
		data() {
			return {
				title: '收货地址管理',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0
			};
		},
		watch: {

		},
		computed: {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
            addresses () {
                return this.model.user.address.addresses
            }
		},
		methods: {
            jump (path) {
                this.$command('REDIRECT_TO', path, 'push');
            }
		},
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
		mounted() {
            this.$command('LOAD_USER_ADDRESS')
        }
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    .address-list{
        box-sizing: border-box;
    }

    .empty-list{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 70vh;
    }

    .empty-list img{
        width: 350rpx;
        height: 200rpx;
        margin-bottom: 50rpx;
    }

    .empty-list span{
        font-size: 32rpx;
        color: #999;
    }

    .addAddress{
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .addAddress button {
        width: 100%;
        height: 98rpx;
        border-radius: 0;
        box-shadow:0px -1px 0px 0px rgba(230,230,230,1);
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFCC00;
    }


</style>
