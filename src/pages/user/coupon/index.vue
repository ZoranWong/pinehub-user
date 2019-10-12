<!--suppress ALL -->
<template>
    <coupon-tickets :model="model"  :loadTickets="loadTickets"></coupon-tickets>
</template>
<script>
	import CouponTickets from '@/components/CouponTickets';

	export default {
		data () {
			return {
				title: '我的卡券',
				name: 'Tickets',
				cur: 0,
				statusType: 'available',
				model: 'model.user.tickets',
				command: 'LOAD_USER_TICKETS'
			};
		},
		components: {
			'coupon-tickets': CouponTickets
		},
		methods: {
			loadTickets (page, status) {
				this.$command('LOAD_USER_TICKETS', page);
			}
		},
        mounted () {
			this.$command('LOAD_USER_TICKETS', 1);
			let needReturn = this.$route.query.needReturn;
			if (needReturn) {

            }
		}
	}
</script>
