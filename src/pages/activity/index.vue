<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <m-list @show-cart ="hdlShowCart" :next="next" :list="merchandises" :height="screenHeight"></m-list>
    <cart v-if="isShowCart" @hdlShowPopup="hdlShowPopup"></cart>  

    <pop-location v-if="isShow" @hdlHidePopup="hdlHidePopup"></pop-location>
  </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import FoodsList from '@/components/FoodsList';
    import Cart from '@/components/Cart'
    import PopupLocation from'./PopupLocation';
    export default{
      data(){
        return{
          title:'新品预定',
          isShow:false,
          isShowCart:true,
          activityId: 0, 
          screenHeight: ''
      }
    }, 
    components: {
      'mp-title':MpTitle,
      'm-list':FoodsList,
      'cart': Cart,
      'pop-location':PopupLocation
      
   },
   computed: {
      merchandises(){
        return this.$store.getters['model.activity.merchandises/list'];
      },
      currentPage () {
       let page = this.$store.state['model.activity.merchandises'].currentPage;
       return page;
      },
   },
   methods:{
      hdlShowCart:function(){
        this.isShowCart =  true;
      },
      hdlShowPopup:function(){
        this.isShow = true;
          console.log(1)
      },
       hdlHidePopup:function(){
          console.log(2)
        this.isShow = false;
      },
      next() {
        this.$command('GET_MERCHANDISE_LIST', 'model.activity.merchandises/setList', 'activity', this.activityId, this.currentPage + 1, this.pageCount);
      }
   },
   created () {
    
    this.screenHeight = (750 / wx.getSystemInfoSync().windowWidth  * wx.getSystemInfoSync().windowHeight) + 'rpx';
   }
}

</script>

<style scoped>

</style>