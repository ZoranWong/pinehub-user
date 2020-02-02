<!--suppress ALL -->
<template>
    <div class="timeSelector">
        <picker
            class='picker'
            mode="multiSelector"
            @change="bindStartMultiPickerChange"
            @columnchange="bindMultiPickerColumnChange"
            :value="multiIndex"
            :range="ranges"
        >
            <span v-if="!time" class="pickerTime">
                请选择送货时间
            </span>
            <span v-else class="pickerTime">
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
                multiIndex: [],
                dateRangeAry: [],
                hoursRangeAry: [],
                minutesRangeAry: ['00', '30'],
                ranges: []
            }
        },
        watch: {
            hoursRangeAry (val) {
                this.ranges = [this.dateRangeAry, val, this.minutesRangeAry]
            },
            minutesRangeAry (val) {
                this.ranges = [this.dateRangeAry, this.hoursRangeAry, val]
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
                this.multiIndex = value;
                this.date = this.dateRangeAry[value[0] || 0];
                this.time = this.hoursRangeAry[value[1] || 0] + ':' + this.minutesRangeAry[value[2] || 0]
            },
            bindMultiPickerColumnChange (e) {
                let event = e.mp.detail;
                this.multiIndex[event.column] = event.value
                let today = new Date();
                if (today.getHours() > 14) {
                    this.hoursRangeAry = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']
                } else {
                    if (event.column === 0 && event.value === 0) {
                        let hours = today.getHours() + 4;
                        // 下单后选择四小时后的时间开始配送
                        let hoursRangeAry = [];
                        while (hours < 19) {
                            hoursRangeAry.push(hours);
                            hours ++
                        }
                        this.hoursRangeAry = hoursRangeAry;
                    } else {
                        this.hoursRangeAry = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']
                    }
                }

                if (event.column === 1 && event.value === this.hoursRangeAry.length - 1) {
                    this.minutesRangeAry = ['00']
                } else {
                    this.minutesRangeAry = ['00', '30']
                }
            }
        },
        mounted () {
            let today = new Date();
            if (today.getHours() > 14) {
                this.getDateRangeAry(1);
                this.hoursRangeAry = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']
            } else {
                this.getDateRangeAry(0);
                let hours = today.getHours();
                let hoursRangeAry = [];
                while (hours < 19) {
                    hoursRangeAry.push(hours);
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
