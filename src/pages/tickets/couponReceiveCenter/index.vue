<!--suppress ALL -->
<template>
    <div class="couponCenter">
        <CustomHeader :title="title" :needReturn="true" />
    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';

	export default {
		data () {
			return {
				title: '领券中心',
			};
		},
		components: {
            CustomHeader
		},
        computed : {

        },
		methods: {
		},
        mounted () {

		}
	}
</script>
