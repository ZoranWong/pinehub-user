<!--suppress ALL -->
<template>
    <div class="addressSelector">
<!--        <picker mode="region" @change="bindRegionChange" :value="region" >-->
<!--            <view class="picker">-->
<!--                <span v-if="region.length < 2">-->
<!--                    {{region}}-->
<!--                </span>-->
<!--                <span v-else>-->
<!--                    {{region[0]}}，{{region[1]}}，{{region[2]}}-->
<!--                </span>-->
<!--                <i class="iconfont">&#xe77c;</i>-->
<!--            </view>-->
<!--        </picker>-->
        <picker
            class='picker'
            mode="multiSelector"
            @change="bindStartMultiPickerChange"
            @columnchange="bindStartPickerColumnChange"
            :value="multiStart"
            :range="ranges"
        >
            <span  class="pickerTime" v-if="!area">
                请选择地区
            </span>
            <span v-else class="pickerTime" >
                <span>{{area}}</span>
            </span>
        </picker>
    </div>
</template>

<script>
    import {CustomRegion} from '../utils/CustomRegion';
    import _ from 'underscore'
    export default {
		name: 'AddressSelector',
        props: ['regions'],
        data () {
		    return {
                // region: ['请选择地区'],
                multiStart: [],
                ranges: [[],[],[]],
                provinceRange: [],
                cityRange: [],
                areaRange: [],
                area: ''
            }
        },
        watch: {
		    regions (val) {
		        this.area = val;
            },
            provinceRange (val) {
                this.ranges = [val, this.cityRange, this.areaRange]
            },
            cityRange (val) {
                this.ranges = [this.provinceRange, val, this.areaRange]
            },
            areaRange (val) {
                this.ranges = [this.provinceRange, this.cityRange, val]
            },
        },
        methods: {
            // bindRegionChange: function (e) {
            //     this.region = e.mp.detail.value;
            //     this.$emit('save', e.mp.detail.value, e.mp.detail.code)
            // },
            bindStartMultiPickerChange (e) {
                let value = e.mp.detail.value;
                this.multiStart = value;
                value[0] = value[0] ? value[0] : 0;
                value[1] = value[1] ? value[1] : 0;
                value[2] = value[2] ? value[2] : 0;
                let province = CustomRegion[value[0]].code;
                let city = CustomRegion[value[0]].children[value[1]].code;
                let area = CustomRegion[value[0]].children[value[1]].children[value[2]].code;
                this.area = this.provinceRange[value[0]] + ',' + this.cityRange[value[1]] + ',' + this.areaRange[value[2]]
                this.$emit('save', '', [province, city, area])
            },
            bindStartPickerColumnChange (e) {
                let event = e.mp.detail;
                this.multiStart[event.column] = event.value;
                if (event.column === 1) {
                    let areas = [];
                    _.map(CustomRegion[0].children[event['value']].children, (area) => {
                        areas.push(area.name)
                    });
                    this.areaRange = areas;
                    this.multiStart[2] = 0
                }
            },
        },
        mounted () {
		    this.provinceRange = [CustomRegion[0].name]
            let cities = [];
		    let areas = [];
		    _.map(CustomRegion[0].children, (city) => {
                cities.push(city.name);
            })
            _.map(CustomRegion[0].children[0].children, (area) => {
                areas.push(area.name)
            })
            this.cityRange = cities;
		    this.areaRange = areas;
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
