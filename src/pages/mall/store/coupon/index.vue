<template>
  <coupon-tickets :model = "model" :usedCardCode = "usedCardCode" :tabs = "tabs" :loadTickets = "loadTickets" @useTicket = "useTicket"></coupon-tickets>
</template>
<script>
  import CouponTickets from '@/components/CouponTickets';
  export default {
    data () {
      return {
        title: '我的卡券',
        name: 'StoreTickets',
        cur: 0,
        statusType: 'available',
        model: 'model.store.tickets',
        command: 'LOAD_STORE_TICKETS'
      };
    },
    props: {
      orderCreateRoute: {
        default: null,
        type: String
      }
    },
    components: {
      'coupon-tickets': CouponTickets
    },
    computed: {
      usedCardCode () {
        return this.$store.getters['model.store.shoppingCarts/ticketCode'];
      }
    },
    methods: {
      loadTickets (page, status) {
        this.$command('LOAD_STORE_TICKETS', page, status);
      },
      useTicket (ticket) {
        this.$store.dispatch('model.store.shoppingCarts/setTicketCard', {
          ticketCode: ticket.cardCode,
          cardId: ticket.cardId,
          discount: ticket.discount,
          reduceCost: ticket.reduceCost,
          title: ticket.title
        });
        this.mp.router.push(this.$route.query['back_to'], {
          query: this.$route.query
        });
      }
    }
  }
</script>
