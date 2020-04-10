<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <div class="homemaking" :style="{'height' : mainHeight + 'px'}">
<!--            <img mode="widthFix" src="../../../../../static/images/background/homeworking.jpeg" alt="">-->
        </div>
    </div>
</template>

<script>
    import CustomHeader from "../../../../components/CustomHeader";
    export default {
        name: "index",
        components: {CustomHeader},
        data () {
            return {
                title: '安心家政'
            }
        },
        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            }
        }
    }
</script>

<style scoped>
    .homemaking{
        width: 100%;
        overflow: auto;
    }

    .homemaking img {
        width: 750rpx;
        height: auto;
    }
</style>
