<!--suppress ALL -->
<template>
    <div>
        <div v-if="showView">
            <web-view
                :src="url"
                @message="receive"
            ></web-view>
        </div>
        <Auth v-if="getAuth" @close="closeAuth" />
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />
    </div>

</template>

<script>
    import _ from 'underscore';
    import Auth from "../../../components/Auth";
    import GetUserMobile from "../../../components/GetUserMobile";
    export default {
		name: 'index',
        data(){
		    return {
                url: '',
                showView: false,
                options: {},
                getAuth: false,
                showBindMobile: false
            }
        },
        components: {
            Auth
        },
        destroyed () {

        },
        watch: {
		    url (val) {
		        if (val) {
                    console.log(val, '&&&&&&');
                    this.showView = true
                }
		    },
            token (val) {
                console.log(val, '(((((((((((((((((((((((((((((((((((((');
                if (val) {
                    wx.setNavigationBarTitle({
                        title: decodeURI(this.options.name)
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
                    this.url = `https://neptune.klsfood.cn/activity.html?activity_id=${this.options.id}&token=${val}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
                    console.log(this.url, 'activity uel');
                    // this.url = `http://activity.node:8091/?activity_id=6`;
                } else {
		            this.getUserAuth()
                }
            },
            registered (value) {
                if (value) {
                    this.closeAuth()
                }
                if (value && !this.isMember) {
                    this.showBindMobile = true
                }
            },
            isMember (val) {
                if (val) {
                    this.showBindMobile = false;
                }
            },
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
            token(){
                if (this.model.account.token) {
                    return this.model.account.token.value;
                } else {
                    return null
                }

            },
            registered () {
                return this.model.account.registered;
            },
            isAuth () {
                return this.model.account.isAuth;
            },
            isMember () {
                return this.model.account.isMember;
            },
        },
        onShareAppMessage: function (res) {
            console.log(this.options, '==========>');
            //可以先看看页面数据都有什么，得到你想要的数据
            return {
                title: decodeURI(this.options.name),
                desc: "青松易购小程序",
                imageUrl: "",
                path: `/pages/activities/activities/main?id=${this.options.id}&name=${this.options.name}`,
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
            },
            getUserAuth () {
                this.getAuth = true
            },
            closeAuth () {
                this.getAuth = false
            },
            closeGetUserMobile () {
                this.showBindMobile = false
            }

        },
        onShow () {
            let pages =  getCurrentPages();
            console.log(pages, 'xxxxxxx');
            let options = pages[pages.length - 1]['options'];
            this.options = options;
            console.log(options, '========>>>>>>>>>');
            if (this.token) {
                wx.setNavigationBarTitle({
                        title: decodeURI(this.options.name)
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
                    console.log(str, '===>');
                    this.url = `https://neptune.klsfood.cn/activity.html?activity_id=${options.id}&token=${this.token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
            } else {
                this.getUserAuth()
            }

        },
        onHide () {
            console.log('on hide');
            this.url = '';
            this.showView = false;
        },
        onUnload () {
            console.log('onUnload');
        },
        components: {},
        mounted () {
            if (!this.token) {
                this.getUserAuth()
            }
        }
    }
</script>

<style scoped>
    .web-view #custom_header{
        display: none;
    }

</style>
