<!--suppress ALL -->
<template>
    <div>
        <img :src='image' alt="" class="newUser" @click="detail" />
    </div>
</template>

<script>
	export default {
		name: 'Module_1',
        props: ['image', 'id'],
        methods: {
            detail () {
		        this.$emit('do', this.id)
            }
        }
	}
</script>

<style scoped>
    .newUser{
        width: 100%;
        height: 400rpx;
        margin-top: 20rpx;
        border-radius: 25rpx;
    }
</style>
