<template>
    <div class="preview">
        <div v-if="msg !== ''" v-html="msg" style="width: 900px;margin: 0 auto;"></div>
        <div v-else style="width: 100%;text-align: center;">
            <span style="font-size: 16px">暂无内容展示</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "preview",
        props: {
            msg:''
        },
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>
