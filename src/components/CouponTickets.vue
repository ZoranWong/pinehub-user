<!--suppress ALL -->
<template>
  <div class="Coupon body">
    <mp-title :title="title"></mp-title>
    <div id="tab_select" v-if = "tabs.length > 0">
      <ul>
        <li v-for="(tab , index) in tabs " :key="index" :class="{tab_select_now:cur == index }" :style="{ width:tabNumWidth }" @click="tabSelect(index)">
          <span class="span-inline">{{ tab.name }}</span>
        </li>
      </ul>
    </div>
    <div id="tab_content">
      <ul class="tab_content_item" v-if="cur === 0">
        <li v-for="(ticket, ticketIndex) in tickets" :key="ticketIndex" :loadTickets="loadTickets" :status="statusType">
          <coupon-ticket :usedCardCode = "usedCardCode" :ticket = "ticket" @useTicket = "useTicket"></coupon-ticket>
        </li>
      </ul>
      <ul class="tab_content_item" v-else-if="cur === 1">
        <li v-for="(ticket, ticketIndex) in tickets" :key="ticketIndex" :loadTickets="loadTickets" :status="statusType" >
          <coupon-tickect :ticket = "ticket" ></coupon-tickect>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import Ticket from '@/components/Ticket';
  import _ from 'underscore';
  export default {
    data () {
      return {
        title: '我的卡券',
        name: 'Coupon',
        cur: 0,
        statusType: 'available'
      }
    },
    props: {
      tabs: {
        default: function () {
          return [];
        },
        type: Array
      },
      loadTickets: {
        default: null,
        type: Function
      },
      model: {
        default: null,
        type: String
      },
      usedCardCode: {
        default: null,
        type: String
      }
    },
    components: {
      'mp-title': MpTitle,
      'coupon-ticket': Ticket
    },
    computed: {
      tabNumWidth () {
        let num = this.tabs.length
        num = (num === 'undefined') ? 1 : num;
        return Math.floor((100 / num) * 100) / 100 + '%';
      },
      tickets () {
        return this.$store.getters[`${this.model}/list`];
      }
    },
    methods: {
      useTicket (ticket) {
        this.$emit('useTicket', ticket);
      },
      tabSelect (num) {
        this.cur = num;
        switch (num) {
          case 0:
            this.statusType = 'available';
            break;
          case 1:
            this.statusType = 'unavailable';
            break;
          default:
            this.statusType = 'available';
            break;
        }
      }
    },
    mounted () {
      console.log('use ticket code =====', this.useCardCode);
      this.loadTickets();
    }
  }
</script>

<style scoped>
  #tab_select {
    overflow: hidden;
    width: 750rpx;
    height: 74rpx;
  }

  #tab_select ul li {
    font-size: 28rpx;
    font-weight: 400;
  }

  #tab_select ul li.tab_select_now span {
    width: 150rpx;
    line-height: 70rpx;
    border-bottom: 4rpx solid #FECE00;
  }

  #tab_content {
    padding-top: 20rpx;
  }
</style>
