<template>
    <div class="body" v-if="ticketInfo">
        <CustomHeader :title="title" :needReturn="true" />

        <div id="ticket_body">
            <span v-if="ticketInfo.type == 'cash'"><em>{{ticketInfo.info.reduce_cost}}</em><i>元</i></span>
            <span v-else><em>{{ticketInfo.info.discount}}</em><i>折</i></span>
            <span>{{ticketInfo.info.base_info.title}}</span>
            <i id="ticket_body_icon"></i>
        </div>
        <form report-submit="true" @submit = "submitFormId">
            <button v-if="canGet" class="ticket_btn" form-type="submit" :class="newClass" @click="getTicket">
                {{ticketBtn}}
            </button>
            <button v-else-if="!ticketInfo.can_get" :class="newClass" form-type="submit" class="ticket_btn" @click="url">
                去使用
            </button>
            <button v-else class="ticket_btn" :class="newClass" form-type="submit" open-type="getUserInfo" @getuserinfo="getUserInfo">
                {{ticketBtn}}
            </button>
        </form>
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
	import CustomHeader from '../../../components/CustomHeader';


	export default {
        components: {
			CustomHeader
        },
        data () {
            return {
                title: '领取优惠券',
                ticketInfo: null,
                ticketBtn: '立即领取',
                newClass: '',
                ticket: null,
                ticketId: null
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
            },
            ticketId (value) {
                if (value) {
                    this.loadTicket();
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
                return this.registerd &&
                    this.ticketInfo['can_get'] ||
                    !this.ticketInfo;
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
            async submitFormId (e) {
                console.log('---------------------------', e);
                let formId = e.mp.detail.formId;
                console.log('---------------------------', formId, this.http.account);
                await this.http.account.saveFormId(formId);
                console.log('save form id', formId);
            },
            async getTicket (e) {
                let ticketId = this.ticketInfo.id;
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
            async initAccount (id) {
                // let result = await this.map.getLocation();
                if (!this.accessToken) {
                    await this.$command('APP_ACCESS');
                }
                if (!this.isLogin) {
                    await this.$command('SIGN_IN', this.accessToken);
                }

                if (id) {
                    this.ticketId = id;
                }
            },
            url () {
                this.$command('REDIRECT_TO', 'index', 'replace');
            },
            async loadTicket () {
                this.ticketInfo = await this.http.tickets.getTicketDetail(this.ticketId);
            }
        },
        mounted: function () {
            let ticketInfo = this.$route.query['ticketInfo'] ? JSON.parse(this.$route.query['ticketInfo']) : null;
            if (ticketInfo) {
                this.ticketInfo = ticketInfo;
            }
            if (this.$route.query['id']) {
                this.initAccount(this.$route.query['id']);
            }

            if (this.$route.query['scene']) {
                this.initAccount(this.$route.query['scene']);
            }
        },
        onLoad (options) {
            if (options.q) {
                console.log('-------------- ticket page query ----------', options.q);
                let scanUrl = decodeURIComponent(options.q);
                let ticketId = scanUrl.match(/\d+/)[0] // 提取链接中的数字，也就是链接中的参数id，/\d+/ 为正则表达式
                this.initAccount(ticketId);
            }
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>
    .body {
        overflow: hidden;
        width: 750rpx;
        background-color: #f2f2f2;
        font-weight: normal;
    }


</style>
