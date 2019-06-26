<template>
    <Comment :id="id"></Comment>
</template>

<script>
    import Comment from  '../subcomponents/Comment.vue';
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        },
        components: {
            Comment
        }
    }
</script>

<style scoped>

</style>