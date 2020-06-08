<!--suppress ALL -->
<template>
    <div id="tab_select" v-if="!showAllCates" :style="{position: top > 290 ? 'fixed' : 'relative', top: top > 290 ? headerHeight + 'px' : 0}" >
        <view class="page-section-spacing">
            <scroll-view
                class="scroll-view_H"
                scroll-x="true"
                bindscroll="scroll"
                enable-back-to-top="true"
                :scroll-into-view="scrollTo"
                :style="{width: categories.length * 200 + 'rpx' }">
                <view :id="'cate' + tab.id" class="scroll-view-item_H" v-for="tab in categories" :class="{tab_select_now:statusType === tab.id}" :key="tab.id" @click="tabSelect(tab)">{{tab.name}}</view>
            </scroll-view>
        </view>
        <div class="imgs">
            <div class="imgBox">
                <img src="../../../../../static/icons/class.png" @click="openCate" alt="">
            </div>
        </div>
    </div>
    <div class="allCates" v-else :style="{top: top > 290 ? headerHeight + 'px' : 0, position: top > 290 ? 'fixed': 'absolute'}">
        <div class="cates" >
            <div class="header">
                选择分类
                <img src="../../../../../static/icons/cateClose.jpg" @click="closeCate" alt="">
            </div>
            <ul>
                <li v-for="items in categories" :key="items.id" :class="items.id === statusType ? 'active': ''" @click="tabSelect(items)">
                    {{items.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Classification',
        props: ['top', 'headerHeight','actId'],
        data () {
		    return {
                scrollTo: '',
                statusType: '',
                showAllCates: false,
            }
        },
        watch: {
            categories (val) {
                if (val && val.length) {
                    this.$command('LOAD_PRODUCTS_IN_CATES_COMMAND', this.actId , 1, 10, val[0].id)
                    this.statusType = val[0].id
                }
            }
        },
        computed :{
            categories () {
                return this.model.activity.categories
            },
        },
        mounted () {
        },
        methods: {
            tabSelect(tab) {
                this.statusType = tab.id;
                this.scrollTo = 'cate' + tab.id;
                this.$command('LOAD_PRODUCTS_IN_CATES_COMMAND', this.actId,1, 10, tab.id)
            },
            openCate () {
                this.showAllCates = true;
                this.$emit('forbidScroll', true)
            },
            closeCate () {
                this.showAllCates = false;
                this.$emit('forbidScroll', false)
            }
        }
	}
</script>

<style scoped>
    #tab_select{
        width: 100%;
        overflow: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fffff;
        z-index: 9999;
    }

    #tab_select .page-section-spacing{
        width: 674rpx;
        overflow: auto;
        z-index: 500;
        background: #fff;
    }



    #tab_select .imgs{
        height: 88rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
    }
    #tab_select .imgs .imgBox{
        width: 78rpx;
        height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: #ccc -5px 0 5px -5px;
        z-index: 800;
    }
    #tab_select img{
        width: 32rpx;
        height: 28rpx;
    }

    #tab_select .scroll-view_H{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 88rpx;
        background: #fff;
    }

    #tab_select .scroll-view_H .scroll-view-item_H{
        width: 200rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #757575;
        display: inline-block;
        line-height: 88rpx;
    }

    #tab_select .scroll-view_H .tab_select_now{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
        position: relative;
    }

    #tab_select .scroll-view_H .tab_select_now:after{
        content: '';
        width: 40rpx;
        height: 10rpx;
        background: #ffcc00;
        border-radius: 3rpx;
        position: absolute;
        bottom: 0rpx;
        left: 80rpx;
    }

    .allCates{
        width: 100%;
        background: rgba(17,17,17,0.5);
    }

    .allCates .cates{
        background: #fff;
        padding: 0 40rpx;
    }

    .allCates .cates .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        font-size: 24rpx;
        color: #4d4d4d;
        width: 100%;
        height: 88rpx;
    }

    .allCates .cates .header img{
        width: 28rpx;
        height: 28rpx;
        position: absolute;
        right: 0;
    }

    .allCates .cates ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 30rpx;
    }

    .allCates .cates ul li{
        width: 210rpx;
        height: 70rpx;
        border-radius: 10rpx;
        background: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        color: #111;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .allCates .cates ul li:nth-child(3n){
        margin-right: 0;
    }

    .fixed{
        position: fixed;
        top: 0;
    }

    .active{
        background: #FEFAE7 !important;
        color: #ffcc00!important;
    }

</style>
