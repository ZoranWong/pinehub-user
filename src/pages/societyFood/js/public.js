export default {
    computed : {
        statusBarHeight () {
            return this.model.global.barHeight.statusBarHeight
        },
        navHeight () {
            return this.model.global.barHeight.navHeight
        },
        imgHeight:function () {
            let statusBarHeight=this.model.global.barHeight.statusBarHeight;
            let navHeight=this.model.global.barHeight.navHeight;
            return parseInt(statusBarHeight)+parseInt(navHeight);
        },
        topHeight:function () {
            let statusBarHeight=this.model.global.barHeight.statusBarHeight;
            let navHeight=this.model.global.barHeight.navHeight;
            return parseInt(statusBarHeight)+parseInt(navHeight)+32;
        },
        clientInfoWidth(){
            return this.$width + 'px';
        },
        clientInfoHeight(){
            return this.$height + 'px';
        }
    },
    methods:{
        //联系客服
        contactCustomerService:function(phone){
            wx.makePhoneCall({
                phoneNumber: phone,
            })
        }
    }
}
