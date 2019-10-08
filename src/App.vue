<template>
    <div id="app">
        <!--    <img src="./assets/logo.png">-->
        <!--    <div>-->
        <!--      <p>-->
        <!--        If Element is successfully added to this project, you'll see an-->
        <!--        <code v-text="'<el-button>'"></code>-->
        <!--        below-->
        <!--      </p>-->
        <!--      <el-button>el-button</el-button>-->
        <!--    </div>-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <router-view></router-view>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        watch: {
            $route(to, from) {
                let length = to.path.split('/').length;
                if(length === 3){
                    this.$store.state.secondpage = true;
                }else if(length === 4){
                    this.$store.state.secondpage = false;
                }
                console.log(to.path);
            }
        },
        // components: {
        //   HelloWorld
        // }
    }
</script>

<style>
    .el-tooltip__popper {
        max-width: 400px;
        line-height: 180%;
    }
</style>
