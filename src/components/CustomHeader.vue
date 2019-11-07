<!--suppress ALL -->
<template>
    <div id="custom_header" :style="{'background': background}" >
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div id="back_icon" v-if="needReturn" @click="back">
                <i class="iconfont">&#xe679;</i>
            </div>
            <div id="nav_title">
                {{title}}
            </div>
        </div>
    </div>

</template>

<script>
	export default {
		name: 'CustomHeader',
        props: ['title','needReturn'],
        data () {
		    return {
		    	barHeight: 0,
                background: ''
            }
        },
        methods:{
		    back(){
		    	this.$command('REDIRECT_TO','','back')
            }
        },
        computed : {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
            },
			navHeight () {
				return this.model.global.barHeight.navHeight
            }
        },
        mounted () {
			this.background = this.title === '首页'? '#ffcc00' : 'linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1))'
			this.$command('GET_BAR_HEIGHT')
		}
	}
</script>

<style>
    #custom_header{
        width: 100%;
    }

    #status_bar {}

    #nav_bar{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    #nav_bar #back_icon{
        position: absolute;
        left: 20rpx;
    }

    #nav_bar #back_icon .iconfont{
        font-size: 32rpx;
        color: #111111!important;
    }

    #nav_bar #nav_title{
        font-size: 32rpx;
        color: #111;
    }

</style>
