<template>
	<div class="category-wrapper">
		<div id="tab_select">
			<ul>
				<!-- <li class="category-item search" @click="redirectTo('search')">
					<i class="i-icon search-icon"></i>
					<span class="search-txt category-name">搜索</span>
				</li> -->
				<li v-for="(tab, index) in categories" :class="{tab_select_now : currentCategoryIndex == index}" :key="index" @click="categoryChange(index)">
					<span class="new-txt category-name">{{ tab.name }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	computed: {
		categories() {
			return this.$store.getters['model.storeMarket.categories/categories'];
		},
		currentCategoryIndex () {
            return this.$store.getters['model.storeMarket.merchandises/currentCategoryIndex'];
        }
	},
	methods: {
		categoryChange(index) {
			this.currentCategoryIndex = index;
			this.$emit('categoryChange', index);
		},
		redirectTo(router) {
			this.$command('REDIRECT_TO', router, 'push');
		}
	},
	mounted() {
        this.$emit('categoryChange', 0);
    }
}
</script>

<style scoped>
.category-wrapper {
	width: 120rpx;
	height: 100%;
	overflow-y: auto;
}

#tab_select {
	overflow: hidden;
	width: 100%;
}

.search {
	height: 130rpx;
	box-sizing: border-box;
	text-align: center;
	border-bottom-right-radius: 10rpx;
	padding: 28rpx 0rpx;
}

.search-icon {
	display: inline-block;
	width: 40rpx;
	height: 40rpx;
	background: url("../../../../../static/images/icon/search-icon.png") no-repeat;
	background-size: contain;
	margin: 0rpx 40rpx 10rpx;
}

#tab_select ul li {
	display: table;
	width: 120rpx;
	height: 108rpx;
	text-align: center;
	font-size: 28rpx;
	font-weight: 400;
	box-sizing: border-box;
	box-shadow: 4rpx 0rpx 10rpx rgba(205, 205, 205, 0.3);
}

#tab_select ul li .category-name {
	width: 56rpx;
	display: inline-block;
	line-height: 40rpx;
	margin-top: 7px;
}

#tab_select ul li.tab_select_now {
	color: #FECE00;
	border-left: 6rpx solid #fece00;
	background: #fafafa url("../../../../../static/images/icon/new-product-icon.png") no-repeat center 20%;
	background-size: 58rpx 66rpx;
	padding-top: 100rpx;
}

#tab_content {
	padding-top: 74rpx;
}

.tab_content_now {
	display: block;
}
</style>
