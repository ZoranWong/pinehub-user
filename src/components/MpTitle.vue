<template>
	<div id="mptitle"></div>
</template>

<script>
	export default {
		name: 'MpTitle',
		props: ['title'],
		data() {
			return {
				title: ""
			};
		},
		methods: {

		},
		created() {
			wx.setNavigationBarTitle({
				title: this.title
			})
		},
		beforeUpdate() {
			wx.setNavigationBarTitle({
				title: this.title
			})
		}
	}
</script>

<style scoped>
	#mptitle {
		display: none;
	}
</style>