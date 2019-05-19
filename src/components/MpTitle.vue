<template>
    <div id="mptitle"></div>
</template>

<script>
    export default {
        name: 'MpTitle',
        props: ['title'],
        onLoad () {
            wx.showNavigationBarLoading();
            setTimeout(() => {
                wx.hideNavigationBarLoading();
                wx.setNavigationBarTitle({
                    title: this.title,
                    fail: (error) => {
                        console.log(error);
                    }
                });
            }, 2000);
        }
    }
</script>

<style scoped>
    #mptitle {
        display: none;
    }
</style>
