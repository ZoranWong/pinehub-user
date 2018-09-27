<template>
  <div class="body">
    <mp-title :title="title"></mp-title>
    <m-list @show-cart ="hdlShowCart"></m-list>
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
          isShowCart:false,
      }
    }, 
    components: {
      'mp-title':MpTitle,
      'm-list':FoodsList,
      'cart': Cart,
      'pop-location':PopupLocation
      
   },
   created(){
      console.log('created mmm');
      this.$command('GET_MERCHANDISE_LIST', 1, 1);
      console.log('created mm');
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

   }
}

</script>

<style scoped>

</style>