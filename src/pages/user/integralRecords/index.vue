<!--suppress ALL -->
<template>
	<div id="integral_records">
		<mp-title :title="title"></mp-title>
        <div id="integral_records">
            <span>近期积分记录</span>
            <h3>
                积分规则
                <i class="iconfont">&#xe6a3;</i>
            </h3>
        </div>
        <ul id="records">
            <li v-for="item in integralRecords" :key="item.id">
                <div class="left">
                    <h4>{{item.desc}}</h4>
                    <span>没有数据 </span>
                </div>
                <div class="right">
                    {{item.change}}
                </div>
            </li>
        </ul>
	</div>
</template>
<script>
    import MpTitle from '../../../components/MpTitle';
	export default {
		components: {
			'mp-title': MpTitle
		},
		data() {
			return {
				title: '积分记录',
			};
		},
		watch: {
		},
		computed: {
			integralRecords () {
				console.log(this.model.integral.records.integralRecords, '90909900990');
				return this.model.integral.records.integralRecords
            }
		},
		methods: {
		},
		created() {

		},
		mounted() {
			this.$command('LOAD_INTEGRAL_RECORDS')
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    #integral_records{

    }

    #integral_records #integral_records{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40rpx;
        width: 100% ;
        height: 80rpx;
    }

    #integral_records #integral_records span {
        font-size: 28rpx;
        color: #757575;
    }

    #integral_records #integral_records h3{
        font-size: 28rpx;
        color: #757575;
        font-weight: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #integral_records #integral_records h3 i {
        font-size: 22rpx;
        color: #757575;
        margin-left: 20rpx;
    }

    #integral_records #records {
        background: #fff;
        width: 100%;
    }

    #integral_records #records li{
        box-sizing: border-box;
        width: 100%;
        height: 150rpx;
        padding: 35rpx 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #integral_records #records li .left{

    }

    #integral_records #records li .left h4{
        font-size: 28rpx;
        color: #111111;
    }

    #integral_records #records li .left span {
        font-size: 28rpx;
        color: #757575;
    }

    #integral_records #records li .right {
        font-size: 32rpx;
        color: #111111;
    }


</style>
