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
          {
            name: '可使用'
          },
          {
            name: '已使用'
          }
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
      loadTickets () {
        this.$command('LOAD_USER_TICKETS', parseInt(this.$route.query['activity_id']));
      }
    }
  }
</script>
