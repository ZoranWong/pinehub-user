<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <ul class="forms">
            <li class="forms-item">
                <input type="text" placeholder="收货人" v-model="forms.consignee_name"/>
            </li>
            <li class="forms-item">
                <input
                    placeholder="手机号码"
                    type="number"
                    maxlength="11"
                    v-model="forms.consignee_mobile_phone"
                />
            </li>
            <li class="forms-item" >
                <AddressSelector
                    @save="saveRegions"
                />
            </li>
            <li class="forms-item">
                <textarea placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" v-model="forms.detail_address" />
            </li>
        </ul>
        <ul class="setting">
            <li class="setting-item">
                <span class="default">地址标签</span>
                <div class="right" v-if="tag" @click="showTags">
                    <img class="icons" src="../../../../static/icons/company.png" alt="" v-if="tagName === 'company'">
                    <img class="icons" src="../../../../static/icons/school.png" alt="" v-if="tagName === 'school'">
                    <img class="icons" src="../../../../static/icons/home.png" alt="" v-if="tagName === 'home'">
                    <span class="tagName" v-if="isTagCustom">{{tagName ? tagName : forms.consignee_name[0] || "默"}}</span>
                    <i class="iconfont">&#xe77c;</i>
                </div>
                <div class="right" v-else>
                    <span class="tags" v-for="item in tags" :key="item.name" @click="chooseTag(item.slug)">{{item.name}}</span>
                    <span class="more" @click="showTags">更多</span>
                    <i class="iconfont">&#xe77c;</i>
                </div>
            </li>
            <li class="setting-item">
                <span class="default">设为默认地址</span>
                <switch class="switch" :checked="switchChecked" color="#FFEDA6" @change="switchChange"/>
            </li>
        </ul>
        <div class="submit">
            <button class="save" @click="submitAddress">保存并使用</button>
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
	import AddressSelector from '../../../components/AddressSelector';
	export default {
		components: {
			CustomHeader,AddressTags,AddressSelector
		},
		data() {
			return {
				title: '添加收货地址',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0,
                addressTags: false,
                regions: [],
                regionsCode: [],
                tag: false,
                tagName: '',
                isTagCustom: false,
                forms: {
                    consignee_name: '',   // 收货人姓名
                    consignee_mobile_phone: '', // 收货人手机号
                    detail_address: '', // 详细地址
                },
                tags: [
                    {name: '家', slug: 'home'},
                    {name: '学校', slug: 'school'},
                    {name: '公司', slug: 'company'}
                ],
                switchChecked: false,
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
            switchChange (e) {
                this.switchChecked = e.mp.detail.value;
            },
            saveTagName (name) {
                this.tag = true;
                this.tagName = name;
                this.closeTags();
                if (name === 'school' || name === 'home' || name === 'company') {
                    this.isTagCustom = false
                } else {
                    this.isTagCustom = true;
                }
            },
            saveRegions (regions, code) {
                this.regions = regions;
                this.regionsCode = code;
            },
            chooseTag (slug) {
                this.tag = true;
                this.tagName = slug;
            },
            submitAddress () {
                let tagName = this.tag ? this.tagName : false ;
                this.$command('CHECK_DATA', this.forms, this.regionsCode, this.switchChecked, tagName)
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
