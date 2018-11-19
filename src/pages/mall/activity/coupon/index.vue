<template>
  <coupon-tickets :model = "model" :usedCardCode = "usedCardCode" :tabs = "tabs" :command = "command" @useTicket = "useTicket"></coupon-tickets>
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
    computed: {
      usedCardCode () {
        console.log('useCardCode ========================   ', this.$store.getters['model.activity.shoppingCarts/ticketCode']);
        return this.$store.getters['model.activity.shoppingCarts/ticketCode'];
      }
    },
    methods: {
      loadTickets () {

      },
      useTicket (ticket) {
        this.$store.dispatch('model.activity.shoppingCarts/setTicketCard', {
          ticketCode: ticket.cardCode,
          cardId: ticket.cardId,
          discount: ticket.discount,
          reduceCost: ticket.reduceCost,
          title: ticket.title
        });
        this.mp.router.push('activitySubmitOrder', {
          query: this.$route.query
        });
      }
    }
  }
</script>
