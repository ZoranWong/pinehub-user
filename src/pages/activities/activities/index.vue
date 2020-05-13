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
            Auth,GetUserMobile
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
            registered (value) {
                if (value) {
                    this.closeAuth()
                } else {
                    this.getUserAuth()
                }
                if (value && !this.isMember) {
                    this.showBindMobile = true
                }
            },
            isMember (val) {
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
                    this.url = `https://neptune.klsfood.cn/activity.html?activity_id=${this.options.id}&token=${this.token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
                    console.log(this.url, 'activity uel');
                    this.showBindMobile = false;
                } else {
                    this.showBindMobile = true
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
            accessToken () {
                return this.model.app.accessToken;
            },
            accessTokenTTL () {
                return this.model.app.overDate;
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
            console.log(res, ' --------- ----------');
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
            closeAuth (slug){
                this.getAuth = false;
                slug === 'index' && this.$command('REDIRECT_TO', 'index', 'reLaunch');
            },
            closeGetUserMobile () {
                this.showBindMobile = false;
                this.$command('REDIRECT_TO', 'index', 'reLaunch');
            },
            async initAccount () {
                let result = await this.map.getLocation();
                await this.$store.dispatch('model.account/resetFromCache', {
                    initAccount: async () => {
                        if (((this.accessTokenTTL - Date.now()) <= 0) || !this.accessToken) {
                            await this.$command('APP_ACCESS');
                        } else {
                            await this.$command('SIGN_IN', this.accessToken);
                        }
                        if (!this.registered) {
                            this.getUserAuth()
                        }
                    }
                });
            }

        },
        onShow () {
            let pages =  getCurrentPages();
            let options = pages[pages.length - 1]['options'];
            this.options = options;
            if (this.registered && this.isMember) {
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
                    this.url = `https://neptune.klsfood.cn/activity.html?activity_id=${options.id}&token=${this.token}&headHeight=${this.headHeight}&mainHeight=${this.mainHeight}&random=${str}&env=${env}`;
            } else {
                this.initAccount()
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
        mounted () {
            console.log(this.registered, '-------------');
        }
    }
</script>

<style scoped>
    .web-view #custom_header{
        display: none;
    }

</style>
