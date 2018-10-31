<template>
	<div >
		<ul class="tab clearfix ">
			<li  class="bgff" v-for="(tab, index) in tabs" :key="index" :class="{tab_select_now:cur == index}" @click="tabSelect(index)" >
				<span class="txt">{{tab.txt}}</span>
				<i class="selected"></i>
			</li>
		</ul>
		<ul class="Distribution-details  width710" v-if="cur === 0" >
			
			<li class="li-item bgff">
				配送地址
				<p class="details-item">
				<input type="text" class="big-input">
				<!-- <input type="text"  class="mini-input">
				座
				<input type="text"  class="mini-input">
				室 -->
				</p>
			</li>
			<li class="li-item bgff">
				配送时间
				<p class="details-item">
				 	<picker @change="bindPickerChange" :value="index" :range="timesArray">
     		 			<span class="picker">
        				    {{timesArray[index]}}
        				    <i class="inverted-triangle"></i>
      					</span>
    				</picker>
				</p>
			</li>
			<!-- <li class="li-item bgff">
				配送联系电话 
				<p class="details-item tel-num">
				16868686868	
				</p>
			</li> -->
		</ul>
		<ul class="Distribution-details bgff" v-else-if="cur === 1">
			
			<li class="li-item bgff">
				自提地址
				<p class="details-item">
				 {{position.address}}
				</p>
			</li>
			<!-- <li class="li-item bgff">
				配送联系电话 
				<p class="details-item tel-num">
				16868686868	
				</p>
			</li> -->
		</ul>

	</div>	
</template>
<script>
	export default{
		name:'TabDelivery',
		data(){
			return{
				index: 0,
      			timesArray: ['7:00 - 9:00','11:00 - 13:00','17:00 - 19:00'],
       			tabs:[{
       				id:1,
       				txt:"送到"
       			},
       			{
       				id:2,
       				txt:'自提'
       			}],
       			cur: 0
			}
		},
	   props:{
        	position: {
				default: null,
          		type: Object
      		}
    	},
	    computed:{
	       	position(){
	        	return this.$store.getters['model.nearestStore/location'];
	      }
    	},
		methods:{
    		bindPickerChange (e) {
    			 // console.log(e)
    			 this.index =  e.target.value

    		},
    		tabSelect(num) {
				this.cur = num;
				console.log(num);
			}	
		},
		

	}
</script>
<style>
.tab  li{
  	width:226rpx;
   	height: 80rpx;
   	line-height: 80rpx;
   	float:left;
   	text-align: right;
   	margin-right: 20rpx;
   	margin-bottom: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	position: relative;
}
.txt{
	margin-right:52rpx;
}

.selected{
	width:48rpx;
	height: 48rpx;
	background: url(../../static/images/icon/unselected.png) no-repeat;
	background-size:contain;
	display: inline-block;
	position: absolute;
	top:16rpx;
	left:53rpx;
}
.tab_select_now .selected{
	background: url(../../static/images/icon/selected.png) no-repeat;
	background-size:contain;
}
/*配送细节*/
.Distribution-details{
	margin-bottom: 20rpx;
	box-shadow: 0rpx 8rpx 36rpx rgba(204,202,202,0.3);
	/*border:1rpx solid black;*/
}
.li-item{
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 10rpx;
	margin-bottom:4rpx ;
	padding-left: 20rpx;
	box-sizing: border-box;
}
.li-item .details-item{
	display: inline-block;
	height: 80rpx;
	margin-left: 100rpx;
}
.li-item p input{
  	display: inline-block;
  	vertical-align: middle;
}
.mini-input{
	width:100rpx;
	height: 40rpx;
    border:2rpx solid #cccccc; 
    border-radius: 10rpx;
    box-sizing: border-box;
    vertical-align: middle;
}
.li-item .details-item select{
	display: inline-block;

}
.li-item .tel-num{
	margin-left: 44rpx;
}
.picker{
	border:2rpx solid #cccccc; 
    border-radius: 10rpx;
    box-sizing: border-box;
}
.picker .inverted-triangle{
	width:0rpx;
	height: 0rpx;
	display: inline-block;
	margin-right: 8rpx;
	vertical-align:middle;
	border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 20rpx solid #FECE00;
}

</style>