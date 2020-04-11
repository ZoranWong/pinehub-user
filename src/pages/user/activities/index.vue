<!--suppress ALL -->
<template>
    <div v-if="showView">
        <web-view
            :src="url"
            @message="receive"
        ></web-view>
    </div>
</template>

<script>
    import _ from 'underscore';
    export default {
		name: 'index',
        data(){
		    return {
                url: '',
                showView: false
            }
        },
        destroyed () {

        },
        watch: {
		    url (val) {
		        if (val) {
		            this.showView = true
                }
		    }
        },
        computed :{
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headHeight () {
                return this.statusBarHeight + this.navHeight
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headHeight;
            },
        },
        methods: {
            receive (data) {
            }
        },
        components: {},
        mounted () {
            let query = this.$route.query;
            console.log(this);
            let token = this.model.account.token.value;
            wx.setNavigationBarTitle({
                title: query.data.name
            });
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#f2f2f2',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
            let gateway = this.config['app']['http']['gateway'];
            let env = this.config['app']['env'];

            let str = Math.random().toString(36).substr(2)
            this.url = `https://neptune.klsfood.cn/activity.html${query.data.url}&token=${token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
            console.log(this.url, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            // this.url = `http://activity.node:8091/?activity_id=6`;
        }
    }
</script>

<style scoped>
    .web-view #custom_header{
        display: none;
    }

</style>
