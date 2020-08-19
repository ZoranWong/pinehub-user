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
        computed: {
        },
		methods: {
			loadTickets (page) {
				this.$command('LOAD_USER_TICKETS', page);
			}
		},
        mounted () {
			let needReturn = this.$route.query.needReturn;

			if (needReturn) {
				console.log('我是选择可用优惠券的');
			} else {
				console.log('我是从个人中心进来的');
				this.$command('LOAD_USER_TICKETS', 1);
            }
		}
	}
</script>
