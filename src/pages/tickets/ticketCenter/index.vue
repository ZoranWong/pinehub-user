<!--suppress ALL -->
<template>
    <div class="body">
        <coupon-tickets :model="model"  :loadTickets="loadTickets"></coupon-tickets>

    </div>
</template>

<!--suppress ES6ShorthandObjectProperty -->
<script>
    import CouponTickets from './components/CouponTickets';

	export default {
        components: {
            'coupon-tickets': CouponTickets
        },
        data () {
            return {
                name: 'Tickets',
                cur: 0,
                model: 'model.user.tickets',
                command: 'LOAD_CAN_RECEIVE_TICKETS'
            };
        },

        watch: {


        },
        computed: {
        },
        methods: {
            loadTickets (page) {
                this.$command('LOAD_CAN_RECEIVE_TICKETS', page);
            },
        },
        mounted () {
            this.loadTickets(1)
        },
        onLoad (options) {

        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>

</style>
