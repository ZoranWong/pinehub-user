<!--suppress ALL -->
<template>
    <div class="addressSelector">
        <picker mode="region" @change="bindRegionChange" :value="region" >
            <view class="picker">
                <span v-if="region.length < 2">
                    {{region}}
                </span>
                <span v-else>
                    {{region[0]}}，{{region[1]}}，{{region[2]}}
                </span>
                <i class="iconfont">&#xe77c;</i>
            </view>
        </picker>
    </div>
</template>

<script>
    import {regions} from '../utils/region';

    export default {
		name: 'AddressSelector',
        data () {
		    return {
                region: ['请选择地区'],
            }
        },
        methods: {
            bindRegionChange: function (e) {
                this.region = e.mp.detail.value;
                this.$emit('save', e.mp.detail.value, e.mp.detail.code)
            }
        },


	}
</script>

<style scoped>
    .picker{
        display: block;
        width: 345px;
        font-size: 14px;
        color: #111111;
    }
    .iconfont{
        float: right;
        line-height: 21px;
    }
</style>
