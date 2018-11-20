<template>
  <coupon-tickets :model = "model" :usedCardCode = "usedCardCode" :tabs = "tabs" :loadTickets = "loadTickets" @useTicket = "useTicket"></coupon-tickets>
</template>
<script>
  import CouponTickets from '@/components/CouponTickets';
  export default {
    data () {
      return {
        title: '我的卡券',
        name: 'BookingMallTickets',
        cur: 0,
        statusType: 'available',
        model: 'model.bookingMall.tickets',
        command: 'LOAD_BOOKING_MALL_TICKETS'
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
        return this.$store.getters['model.bookingMall.shoppingCarts/ticketCode'];
      }
    },
    methods: {
      loadTickets () {
        this.$command('LOAD_BOOKING_MALL_TICKETS');
      },
      useTicket (ticket) {
        this.$store.dispatch('model.bookingMall.shoppingCarts/setTicketCard', {
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
