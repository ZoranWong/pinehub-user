<!--suppress ALL -->
<template>
    <div class="timeSelector">
        <picker
            class='picker'
            mode="multiSelector"
            @change="bindStartMultiPickerChange"
            @columnchange="bindStartPickerColumnChange"
            :value="multiStart"
            :range="ranges"
        >
            <span  class="pickerTime" v-if="!time">
                请选择送货时间
            </span>
            <span v-else class="pickerTime" >
                <span class="pickerTime">
                    预计送货日期: {{date}}
                </span>
                <span class="pickerTime">
                    预计送货时间: {{time}}
                </span>
            </span>
        </picker>
    </div>
</template>

<script>
    import {getTomorrowDate,getfutureSevenDate} from '../utils';
    import _ from 'underscore'

    export default {
		name: 'TimeSelector',
        props: [''],
        data () {
		    return {
                tomorrowStr: getTomorrowDate(),
                date: '',
                time: '',
                multiStart: [],
                dateRangeAry: [],
                hoursRangeAry: [],
                ranges: [],
            }
        },
        watch: {
            hoursRangeAry (val) {
                this.ranges = [this.dateRangeAry, val]
            }
        },
        methods: {
            getDateRangeAry (start) {
                let range = [];
                for (let i = start; i < 7 + start; i++) {
                    range.push(getfutureSevenDate(i))
                };
                this.dateRangeAry = range
            },
            bindStartMultiPickerChange (e) {
                let value = e.mp.detail.value;
                this.multiStart = value;
                this.date = this.dateRangeAry[value[0] || 0];
                this.time = this.hoursRangeAry[value[1] || 0];
            },
            bindStartPickerColumnChange (e) {
                let event = e.mp.detail;
                this.multiStart[event.column] = event.value;
                let today = new Date();
                if (today.getHours() > 13) {
                    this.hoursRangeAry = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
                } else {
                    if (!this.multiStart[0]) {
                        let hours = today.getHours() + 4;
                        // 下单后选择四小时后的时间开始配送
                        let hoursRangeAry = [];
                        while (hours < 18) {
                            hoursRangeAry.push(`${hours}:00-${hours+1}:00`);
                            hours ++
                        }
                        this.hoursRangeAry = hoursRangeAry;
                    } else {
                        this.hoursRangeAry = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
                    }
                }
            }
        },
        mounted () {
            let today = new Date();
            if (today.getHours() > 13) {
                this.getDateRangeAry(1);
                this.hoursRangeAry = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
            } else {
                this.getDateRangeAry(0);
                let hours = today.getHours() + 4;
                let hoursRangeAry = [];
                while (hours < 18) {
                    hoursRangeAry.push(`${hours}:00-${hours+1}:00`);
                    hours ++
                }
                this.hoursRangeAry = hoursRangeAry;
            }
        }


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
    .pickerTime{
        color: #111!important;
        margin: 0!important;
        display: block;
    }
</style>
