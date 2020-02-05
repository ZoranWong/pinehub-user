<!--suppress ALL -->
<template>
    <div class="addressManage">
        <CustomHeader :title="title" :needReturn="true" />
        <ul class="address-list" v-if="addresses.length">
            <li v-for="item in addresses" :key="item.id" @click="editAddress(item)">
                <div class="left">
                    <img src="../../../../static/icons/home.png" alt="" v-if="item.tag === 'home'">
                    <img src="../../../../static/icons/company.png" alt="" v-if="item.tag === 'company'">
                    <img src="../../../../static/icons/school.png" alt="" v-if="item.tag === 'school'">
                    <span class="customTag" v-if="!item.isDefaultTag">{{ item['consignee_name'][0]}}</span>
                </div>
                <div class="center">
                    <div class="top">
                        <h4>{{item['consignee_name']}}</h4>
                        <span>{{item['consignee_mobile_phone']}}</span>
                    </div>
                    <div class="bottom">
                        <span class="isDefault" v-if="item['is_default']">默认</span>
                        <span class="tag" v-if="item.tag === 'home'">家</span>
                        <span class="tag" v-if="item.tag === 'school'">学校</span>
                        <span class="tag" v-if="item.tag === 'company'">公司</span>
                        <span class="tag" v-if="!item.isDefaultTag">{{item.tag}}</span>
                        <span class="address">{{item.rangeAddress}}{{item['detail_address']}}</span>
                    </div>
                </div>
                <div class="right">
                    <img src="../../../../static/icons/rightArrow.png" alt="">
                </div>
            </li>
        </ul>
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
				screenWitdh: 0,
                isSelect: false
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
                this.$command('REDIRECT_TO', path, 'push', {
                    query: {
                        needReturn: this.isSelect,
                        type : this.$route.query.type
                    }
                });
            },
            editAddress (address) {
                if (this.isSelect) {
                    this.$command('SELECT_ADDRESS_COMMAND', address, this.$route.query.type);
                    this.$command('REDIRECT_TO','','back')
                } else {
                    this.$command('REDIRECT_TO', 'user.addressOperation', 'push', {
                        query: {
                            address: JSON.stringify(address)
                        }
                    });
                }

            }
		},
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
        onShow(){
            this.$command('LOAD_USER_ADDRESS');
            this.isSelect = false;
        },
		mounted() {
            this.isSelect = this.$route.query.needReturn ? true : false
        }
	}
</script>

<style>
	page {
		height: 100%;
		background: #fff;
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

    .address-list{
        border-top: 20rpx solid #f2f2f2;
        margin-bottom: 120rpx;
        height: 1260rpx;
        overflow: auto;
    }
    .address-list li {
        width: 100%;
        padding: 0 40rpx;
        height: 180rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-bottom: 1rpx solid #f2f2f2;
        box-sizing: border-box;
    }
    .address-list li .left img{
        width: 66rpx;
        height: 66rpx;
    }
    .address-list li .left .customTag{
        width: 66rpx;
        height: 66rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(to right, #e5e5e5, #ccc);
    }
    .address-list li .center{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 474rpx;
        flex-wrap: wrap;
        padding: 18rpx 0;
    }
    .address-list li .center .top {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10rpx;
    }
    .address-list li .center .top h4{
        margin: 0;
        font-size: 30rpx;
        color: #111;
        margin-right: 32rpx;
    }
    .address-list li .center .top span{
        color: #757575;
        font-size: 26rpx;
    }
    .address-list li .center .bottom {
    }
    .address-list li .center .bottom .isDefault{
        height: 32rpx;
        padding: 0 10rpx;
        background: #FFFAE5;
        color: #FFCC00;
        font-size: 26rpx;
        padding: 4rpx 10rpx;
        margin-right: 10rpx;
    }
    .address-list li .center .bottom .tag{
        height: 32rpx;
        padding: 0 10rpx;
        background: #f7f7f7;
        color: #757575;
        margin-right: 10rpx;
        font-size: 26rpx;
        padding: 4rpx 10rpx;
    }
    .address-list li .center .bottom .address{
        font-size: 26rpx;
        color: #111;
    }
    .address-list li .right img{
        width: 12rpx;
        height: 22rpx;
    }


</style>
