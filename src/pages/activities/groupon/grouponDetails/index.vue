<!--suppress ALL -->
<template>
	<div id="groupon_details">
        <div class="backImg">
            <img src="./img/background.jpeg" mode="widthFix" alt="">
        </div>
        <img src="./img/background.jpeg" alt="" class="image">
        <SwiperNotice />
	</div>
</template>
<script>
    import _ from 'underscore';
    import SwiperNotice from "../components/SwiperNotice";
	export default {
		components: {
            SwiperNotice
		},
		data() {
			return {

			};
		},
		watch: {

		},
		computed: {

		},
		methods: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style>
	page {
		height: 100%;
        overflow: hidden;
	}

    /*.swiperNotices{*/
    /*    width: auto;*/
    /*    height: 100rpx;*/
    /*}*/

    .backImg{
        width: 100%;
        height: 200rpx;
        overflow: hidden;
    }

    .backImg img{
        width: 100%;
        height: auto;
        -webkit-filter: blur(40px);
        -moz-filter: blur(40px);
        -ms-filter: blur(40px);
        filter: blur(40px);
        transform: translateY(-226rpx);
    }

    .groupon_details .image{
        width: 228rpx;
        height: 221rpx;
    }


</style>
