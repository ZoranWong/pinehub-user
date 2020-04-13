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
                showView: false,
                query: {},
                token: ''
            }
        },
        destroyed () {

        },
        watch: {
		    url (val) {
		        if (val) {
                    console.log(val, '&&&&&&');
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
        onShareAppMessage: function (res) {
            console.log(this.query, '==========>');
            //可以先看看页面数据都有什么，得到你想要的数据
            return {
                title: this.query.data.name,
                desc: "青松易购小程序",
                imageUrl: "",
                path: this.url,
                success: function (res) {
                    // 转发成功
                    console.log("转发成功:" + JSON.stringify(res));
                },
                fail: function (res) {
                    // 转发失败
                    console.log("转发失败:" + JSON.stringify(res));
                }
            }
        },
        methods: {
            receive (data) {
                console.log(data, 'receive');
            }
        },
        onShow () {
            console.log('我又进来啦');
            if (this.query && this.query.data) {
                let gateway = this.config['app']['http']['gateway'];
                let env = this.config['app']['env'];
                let str = Math.random().toString(36).substr(2)
                console.log(str, '===>');
                // this.url = `https://neptune.klsfood.cn/activity.html${this.query.data.url}&token=${this.token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
            }
        },
        onHide () {
            console.log('on hide');
            this.url = ''
        },
        onUnload () {
            console.log('onUnload');
        },
        components: {},
        mounted () {
            let query = this.$route.query;
            this.query = this.$route.query;
            console.log(this);
            let token = this.model.account.token.value;
            this.token = token;
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
            console.log(this.url, 'activity uel');
            // this.url = `http://activity.node:8091/?activity_id=6`;
        }
    }
</script>

<style scoped>
    .web-view #custom_header{
        display: none;
    }

</style>
