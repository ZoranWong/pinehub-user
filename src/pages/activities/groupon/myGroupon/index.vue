<!--suppress ALL -->
<template>
	<div id="my_groupon">
        <CustomHeader :title="title" :needReturn="true"> </CustomHeader>

        <ul class="tabs">
            <li v-for="tab in tabs" :key="tab.key" @click="selectTab(tab.key)">{{tab.name}}</li>
        </ul>

	</div>
</template>
<script>
    import CustomHeader from "../../../../components/CustomHeader";


	export default {
		components: {
            CustomHeader
		},
		data() {
			return {
                title: '我的拼团',
                activeKey: 0,
                tabs: [
                    {name: '待成团', key: 0},
                    {name: '待发货', key: 1},
                    {name: '待自提', key: 2},
                    {name: '已完成', key: 3},
                    {name: '未成团', key: 4},
                ],
                orders: [

                ]
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
            }
		},
		methods: {
            selectTab (key) {
                this.activeKey = key
            }
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




</style>
