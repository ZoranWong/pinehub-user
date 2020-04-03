<!--suppress ALL -->
<template>
    <div>
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
            }
        },
        destroyed () {

        },
        watch: {
		    url (val) {
                console.log(val, 'uuuuuuuuuel');
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
                console.log(data, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
            }
        },
        components: {},
        mounted () {
            let query = this.$route.query;
            console.log(this);
            let token = this.model.account.token.value;
            console.log(token, '===>>>>>>>>>>>>>>>>>>');
            wx.setNavigationBarTitle({
                title: '活动一'
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
            this.url = `${gateway}/${query.data.url}&token=${token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}`;
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
