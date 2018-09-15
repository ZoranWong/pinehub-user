<template>
	<div id="mystore">
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import FooterNav from '@/components/FooterNav';

	export default {
		components: {
			'footer-nav': FooterNav
		},
		data() {
			return {
				navName: "my"
			};
		},
		created() {}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	#mystore {
		position: relative;
		height: 100%;
		width: 100%;
	}
</style>