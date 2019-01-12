<template>
  <coupon-tickets :model = "model" :usedCardCode = "usedCardCode" :tabs = "tabs" :loadTickets = "loadTickets" @useTicket = "useTicket"></coupon-tickets>
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
        model: 'model.newEvents.tickets',
        command: 'LOAD_ACTIVITY_TICKETS'
      };
    },
    components: {
      'coupon-tickets': CouponTickets
    },
    computed: {
      usedCardCode () {
        return this.$store.getters['model.newEvents.shoppingCarts/ticketCode'];
      }
    },
    methods: {
      loadTickets (page, status) {
        this.$command('LOAD_ACTIVITY_TICKETS', parseInt(this.$route.query['activity_id']), page, status);
      },
      useTicket (ticket) {
          this.$store.dispatch('model.newEvents.shoppingCarts/setTicketCard', {
              ticketCode: ticket.cardCode,
              cardId: ticket.cardId,
              discount: ticket.discount,
              reduceCost: ticket.reduceCost,
              title: ticket.title
          });
          this.mp.router.push('newEvents.createOrder', {
              query: this.$route.query
          });
      }
    }
  }
</script>
