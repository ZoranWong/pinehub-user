<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" />


    </div>
</template>

<!--suppress ES6ShorthandObjectProperty -->
<script>
	import CustomHeader from '../../../components/CustomHeader';


	export default {
        components: {
			CustomHeader
        },
        data () {
            return {
                title: '领券中心',
            };
        },
        watch: {


        },
        computed: {

        },
        methods: {

        },
        mounted: function () {
            this.$command('LOAD_CAN_RECEIVE_TICKETS')
        },
        onLoad (options) {

        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>

</style>
