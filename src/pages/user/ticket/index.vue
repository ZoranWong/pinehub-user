<template>
    <div class="body" v-if="ticketInfo">
        <mp-title :title="title"></mp-title>
        <div id="ticket_body">
            <span v-if="ticketInfo.type == 'cash'"><em>{{ticketInfo.info.reduce_cost}}</em><i>元</i></span>
            <span v-else><em>{{ticketInfo.info.discount}}</em><i>折</i></span>
            <span>{{ticketInfo.info.base_info.title}}</span>
            <i id="ticket_body_icon"></i>
        </div>
        <button v-if="canGet" id="ticket_btn" :class="newClass" @click="getTicket(ticketInfo.id)">
            {{ticketBtn}}
        </button>
        <button v-else-if="!ticketInfo.can_get" :class="newClass" id="ticket_btn" @click="url">
            去使用
        </button>
        <button v-else id="ticket_btn" :class="newClass" open-type="getUserInfo" @getuserinfo="getUserInfo">
            {{ticketBtn}}
        </button>

        <div id="ticket_info">
            <ul>
                <li>
                    <em>使用门槛</em>
                    <i v-if="ticketInfo.info.least_cost>0">满{{ticketInfo.info.least_cost}}元可用</i>
                    <i v-else>无门槛券</i>
                </li>
                <li>
                    <em>有效期</em>
                    <i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_FIX_TIME_RANGE'">{{timeType}}</i>
                    <i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_FIX_TERM'">{{timeType2}}</i>
                    <i v-if="ticketInfo.info.base_info.date_info.type == 'DATE_TYPE_PERMANENT'">{{timeType3}}</i>
                </li>
                <li>
                    <em>使用说明</em>
                    <i>本券的有效期见券面所示</i>
                </li>
            </ul>
        </div>
    </div>
</template>

<!--suppress ES6ShorthandObjectProperty -->
<script>
    import MpTitle from '@/components/MpTitle';

    export default {
        components: {
            'mp-title': MpTitle
        },
        data () {
            return {
                title: '领取优惠券',
                ticketInfo: null,
                ticketBtn: '立即领取',
                newClass: '',
                ticket: null
            };
        },
        watch: {
            accessToken (value) {
                if (value) {
                    if (!this.isLogin) {
                        this.$command('SIGN_IN', this.accessToken);
                    }
                }
            },
            hasToken (value) {
                if (this.hasToken) {
                    if (!this.hasLoadedActivity) {
                        this.$command('LOAD_ACCOUNT', false);
                        this.$command('GET_ACTIVITY_INFO');
                    }
                }
            }
        },
        computed: {
            timeType () {
                return `从${this.beginTime()}到${this.endTime()}止`;
            },
            timeType2 () {
                if (this.ticketInfo) {
                    if (this.ticketInfo.info.base_info.date_info.fixed_begin_term > 0) {
                        return `领券${this.ticketInfo.info.base_info.date_info.fixed_begin_term}天后开始生效 ${this.ticketInfo.info.base_info.date_info.fixed_term}天内有效`;
                    } else {
                        return `领券后${this.ticketInfo.info.base_info.date_info.fixed_term}天内有效`;
                    }
                }
            },
            timeType3 () {
                return `永久有效`;
            },
            hasToken () {
                let overDate = this.$store.getters['model.account/overDate'];
                return overDate ? overDate > Date.now() : false;
            },
            registered () {
                return this.$store.getters['model.account/registered'];
            },
            canGet () {
                console.log(this.ticketInfo);
                return this.registerd && this.ticketInfo['can_get'] || !this.ticketInfo;
            },
            isAuth () {
                return this.$store.getters['model.account/isAuth'];
            },
            isMember () {
                return this.$store.getters['model.account/isMember'];
            },
            isLogin () {
                let overDate = this.$store.getters['model.account/overDate'];
                return overDate ? overDate > Date.now() : false;
            },
            accessToken () {
                return this.$store.getters['model.app/accessToken'];
            },
            accessTokenTTL () {
                return this.$store.getters['model.app/overDate'];
            }
        },
        methods: {
            beginTime () {
                if (this.ticketInfo) {
                    let timestamp = this.ticketInfo.info.base_info.date_info.begin_timestamp;
                    return (new Date(timestamp * 1000)).format('yyyy-MM-dd');
                }
            },
            endTime () {
                if (this.ticketInfo) {
                    let timestamp = this.ticketInfo.info.base_info.date_info.end_timestamp;
                    return (new Date(timestamp * 1000)).format('yyyy-MM-dd');
                }
            },
            getPhoneNumber (e) {
                this.$command('SET_USER_MOBILE', e);
            },
            async getUserInfo (e) {
                let res = await this.$command('USER_REGISTER', e);
                console.log(res);
                if (res) {
                    this.getTicket(this.ticketInfo.id);
                } else {
                    wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                    });
                }
            },
            async getTicket (ticketId) {
                if (!this.ticket) {
                    if (this.$store.getters['model.account/registered']) {
                        await this.receiveTicket(ticketId);
                        this.ticketBtn = '去使用';
                        this.ticket = true;
                    } else {
                        wx.showToast({
                            title: '领券失败',
                            icon: 'none'
                        });
                    }
                } else {
                    this.$command('REDIRECT_TO', 'index', 'replace');
                }
            },
            async receiveTicket (ticketId) {
                let res = await this.http.tickets.receiveTicket(ticketId);
                console.log(res);
                if (res) {
                    wx.showToast({
                        title: '领券成功',
                        icon: 'none'
                    });
                } else {
                    wx.showToast({
                        title: '领券失败',
                        icon: 'none'
                    });
                }
            },
            async initAccount () {
                // let result = await this.map.getLocation();
                await this.$store.dispatch('model.account/resetFromCache', {
                    initAccount: async () => {
                        if (((this.accessTokenTTL - Date.now()) <= 0) || !this.accessToken) {
                            await this.$command('APP_ACCESS');
                        } else {
                            this.$command('SIGN_IN', this.accessToken);
                        }
                    }
                });
            },
            url () {
                this.$command('REDIRECT_TO', 'index', 'replace');
            }
        },
        mounted () {
            this.ticketInfo = JSON.parse(this.$route.query['ticketInfo']);
            console.log('==========', this.ticketInfo);
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>
    .body {
        overflow: hidden;
        width: 750rpx;
        background-color: #FAFAFA;
        font-weight: normal;
    }

    #ticket_body {
        position: relative;
        margin: 20rpx;
        padding: 60rpx 40rpx;
        border-radius: 10rpx;
        background: url(../../../../static/images/icon/ticket-left-icon.png) no-repeat left center;
        background-size: auto 100%;
        background-color: #FFFFFF;
    }

    #ticket_body_icon {
        position: absolute;
        right: 0;
        top: 0;
        height: 88rpx;
        width: 88rpx;
        background: url(../../../../static/images/icon/ticket-right-icon.png) no-repeat center center;
        background-size: 100%;
    }

    #ticket_body span {
        display: block;
    }

    #ticket_body span em {
        display: inline-block;
        font-size: 68rpx;
        font-weight: bolder;
    }

    #ticket_body span i {
        display: inline-block;
        font-size: 34rpx;
    }

    #ticket_btn {
        background: #FFCC00;
        color: #333333;
        text-align: center;
        line-height: 80rpx;
        font-size: 34rpx;
        margin: 20rpx;
        border-radius: 10rpx;
    }

    .ticketBtnGray {
        background: #CCCCCC !important;
    }

    #ticket_info {
        background: #F2F2F2;
        border-radius: 5rpx;
        margin: 20rpx;
        padding: 30rpx;
        border-radius: 10rpx;
    }

    #ticket_info ul li {
        margin-bottom: 40rpx;
    }

    #ticket_info ul li:last-child {
        margin-bottom: 0;
    }

    #ticket_info ul li em {
        font-size: 38rpx;
        margin-bottom: 10rpx;
    }

    #ticket_info ul li i {
        font-size: 28rpx;
        color: #828282;
    }
</style>
