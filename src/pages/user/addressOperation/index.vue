<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <ul class="forms">
            <li class="forms-item">
                <input type="text" placeholder="收货人"/>
            </li>
            <li class="forms-item">
                <input
                    placeholder="手机号码"
                    type="number"
                    maxlength="11"
                />
            </li>
            <li class="forms-item">
                <input type="text" placeholder="所在地区" />
                <i class="iconfont">&#xe77c;</i>
            </li>
            <li class="forms-item">
                <textarea placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" />
            </li>
        </ul>
        <ul class="setting">
            <li class="setting-item">
                <span class="default">地址标签</span>
                <div class="right" v-if="tagName" @click="showTags">
                    <span class="tagName">{{tagName}}</span>
                    <i class="iconfont">&#xe77c;</i>
                </div>
                <div class="right" v-else>
                    <span class="tags" v-for="item in tags" :key="item.name">{{item.name}}</span>
                    <span class="more" @click="showTags">更多</span>
                    <i class="iconfont">&#xe77c;</i>
                </div>
            </li>
            <li class="setting-item">
                <span class="default">设为默认地址</span>
                <i class="iconfont">&#xe77c;</i>
            </li>
        </ul>
        <div class="submit">
            <button class="save">保存并使用</button>
        </div>

        <AddressTags
            v-if="addressTags"
            @close="closeTags"
            @save="saveTagName"
            :tagName="tagName"
        />
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	import AddressTags from '../../../components/AddressTags';
	export default {
		components: {
			CustomHeader,AddressTags
		},
		data() {
			return {
				title: '添加收货地址',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0,
                addressTags: false,
                tagName: '',
                tags: [
                    {name: '家'},
                    {name: '学校'},
                    {name: '公司'}
                ]
			};
		},
		watch: {

		},
		computed: {
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
		},
		methods: {
            showTags() {
                this.addressTags = true;
            },
            closeTags () {
                this.addressTags = false
            },
            saveTagName (name) {
                this.tagName = name;
                this.closeTags();
            }
		},
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
		mounted() {

        }
	}
</script>

<style>
    @import "index.css";
	page {
		height: 100%;
		background: #f2f2f2;
        position: relative;
        box-sizing: border-box;
	}

    .tabBox{
        width: 750rpx;
        height: 1624rpx;
        background:rgba(17,17,17,0.3);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .tagContainer{
        transition: 3s;
    }


</style>
