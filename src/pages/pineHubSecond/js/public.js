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
        }
    }
}
