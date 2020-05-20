<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" />
        <div class="container" :style="{height: mainHeight + 'px'}">

        </div>
        <Exchange
            v-if="exchangeVisible"
            @close="exchangeVisible = false"
            @submit="exchangeCode"
        />
    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import Exchange from './components/Exchange';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '我的消费卡',
              exchangeVisible: false
          };
        },
        components: {
			CustomHeader, Exchange
        },
        computed: {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            }
        },
        methods: {
            exchange () {
                this.exchangeVisible = true
            },
            exchangeCode (code) {
                this.$command('EXCHANGE', code)
                setTimeout(()=>{
                    this.exchangeVisible = false
                },1500)
            },
        },
        mounted () {
        	this.$command('LOAD_BALANCE_RECORD')
		}
	}
</script>
<style>
    .body{
        background-color: #fff;
        overflow: hidden;
    }
</style>
