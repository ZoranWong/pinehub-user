<template>
  <coupon-tickets :model = "model" :tabs = "tabs" :loadTickets = "loadTickets"></coupon-tickets>
</template>
<script>
  import CouponTickets from '@/components/CouponTickets';
  export default {
    data () {
      return {
        title: '我的卡券',
        name: 'Tickets',
        cur: 0,
        tabs: [
        ],
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
        this.$command('LOAD_USER_TICKETS', page, status);
      }
    }
  }
</script>
