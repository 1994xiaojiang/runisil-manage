<template>
    <div class="header">
        <div class="header_l">
            <a href="javascript:;" class="logoLink"><img src="./Runisil-1.png" alt="logo"/>Runisil</a
            >
        </div>
        <div class="header_r">
            <div class="headr_d1">
                <!--<side-collapse class="sidecoll"></side-collapse>-->
                <bread-crumb class="bread"></bread-crumb>
            </div>
            <div class="headr_d2">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        用户：{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logoutSystem">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import SideCollapse from '@/components/SideCollapse'
    import BreadCrumb from '@/components/BreadCrumb'
    import {loginout} from '@/api/login'

    export default {
        data(){
          return{
              username: ''
            }
        },
        components: {
            SideCollapse,
            BreadCrumb
        },
        mounted() {
            this.initUserInfo()
        },
        methods: {
            initUserInfo(){
                this.username = sessionStorage.getItem("username");
            },
            logoutSystem(){
                loginout().then().catch();
                this.$store.commit('DEL_TOKEN');
                this.$router.push("/login")
            }
        }
    }
</script>
<style>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
