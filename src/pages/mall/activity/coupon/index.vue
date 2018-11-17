<template>
  <coupon-tickets :model = "model" :tabs = "tabs" :command = "command"></coupon-tickets>
</template>
<script>
  import CouponTickets from '@/components/CouponTickets';
  export default {
    data () {
      return {
        title: '我的卡券',
        name: 'ActivityTickets',
        cur: 0,
        statusType: 'available',
        model: 'model.activity.tickets',
        command: 'LOAD_ACTIVITY_TICKETS'
      };
    },
    components: {
      'coupon-tickets': CouponTickets
    },
    methods: {
      loadTickets () {

      },
      useTicket (id) {

      }
    }
  }
</script>
