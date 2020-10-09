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
        },
        distance:function(lat, lng) {
            var La1 = this.latitude * Math.PI / 180.0;
            var La2 = lat * Math.PI / 180.0;
            var La3 = La1 - La2;
            var Lb3 = this.longitude * Math.PI / 180.0 - lng * Math.PI / 180.0;
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
            s = s * 6378137;//地球半径
            return Math.round(s);
        },
        arraySort:function (list,resultList) {
            let count=list.length;
            for (var k = 0; k <count; k++) {
                let childNum=count-k-1;
                for (var j = 0; j <childNum; j++) {
                    var oneDis=parseInt(list[j].distance);
                    var twoDis=parseInt(list[(j+1)].distance);
                    if(oneDis>twoDis){
                        var temp = list[j];
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
            console.log(JSON.stringify(list));
            var returnList=[];
            for (var i = 0; i <list.length ; i++) {
                var distance=list[i].distance;
                var index=list[i].index;
                resultList[index]["distance"]=distance;
                returnList.push(resultList[index])
            }
            return returnList;
        }
    }
}
