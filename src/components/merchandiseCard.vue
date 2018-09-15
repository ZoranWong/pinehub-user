<template>
  <div class="goods" >
     <menus></menus>
     <m-list @show-cart = "hdlShowCart"></m-list>
  </div>
	
</template>

<script>
import foodsList from './foodsList';
import menus from './menus';
// import popup from '@/components/popup'
export default {
	data(){
		return{

		}
	},
  components:{
    'm-list': foodsList,
    menus: menus,
     // popup:popup,
  },
  methods: {
    hdlShowCart() {
      this.$emit('show-cart');
    }
  }
 }
</script>

<style>
.goods{
  display: flex;
  width:100%;
  overflow: hidden;
  box-sizing: border-box;
  /*position: absolute;
  top:488rpx;
  bottom:98rpx;*/
 /* border:1px solid blue;*/
}

</style>
