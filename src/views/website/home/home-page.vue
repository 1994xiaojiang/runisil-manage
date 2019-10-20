<template>
    <div class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span style="font-weight: 600;font-size: 20px;">首页管理</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="公司主题">
                                <el-input v-model="form.subject"></el-input>
                            </el-form-item>
                            <el-form-item label="公司描述">
                                <el-input type="textarea" v-model="form.description" rows="4"></el-input>
                            </el-form-item>
                            <el-form-item label="公司封面" >
                                <div style="width: 300px; padding-top: 0;">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="uploadUrl"
                                            :show-file-list="false"
                                            :with-credentials='true'
                                            :on-success="handleAvatarSuccess"
                                            :on-error="handleImageError"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="form.imageUrl" :src="form.imageUrl" style="width: auto;height: auto;max-width: 100%;max-height: 100%;" class="avatar" alt=""/>
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </el-form-item>
                            <el-form-item label="产品一">
                                <el-select v-model="form.productOne" placeholder="请选择首页产品一">
                                    <el-option v-for="item in products" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="产品二">
                                <el-select v-model="form.productTwo" placeholder="请选择首页产品二">
                                    <el-option v-for="item in products" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="text-align: center;">
                                <el-button type="success" icon="el-icon-circle-plus-outline" @click="saveHomePage()">保存首页</el-button>
                                <!--<el-button type="primary" icon="el-icon-view" style="margin-bottom: 20px;" @click="showdialog()">预览</el-button>-->
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
    import { getProducts,getHomePageContent,saveHomePage } from '@/api/product'

    export default {
        name: "home-page",
        data(){
            return{
                form:{
                    id: -1,
                    subject:"",
                    description:"",
                    imageUrl:"",
                    productOne: -1,
                    productTwo: -1,
                },
                products: [],
                uploadUrl: process.env.VUE_APP_BASE_API + "manager/uploadImage",
            }
        },
        mounted(){
            this.getHomePageInfo();
        },
        methods:{
            getHomePageInfo(){
                getHomePageContent().then(res =>{
                    if(res.status === 'SUCCESS'){
                        this.form.id = res.data.id;
                        this.form.subject = res.data.subject;
                        this.form.description = res.data.description;
                        this.form.imageUrl = res.data.imageUrl;
                        this.form.productOne = res.data.products[0].id;
                        this.form.productTwo = res.data.products[1].id;
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( error => {
                    this.$message.error(error)
                });
                getProducts().then(res => {
                    if(res.status === "SUCCESS"){
                        this.products = res.data;
                    }
                }).catch(error => {
                    this.$message.error(error)
                });
            },
            saveHomePage(){
                saveHomePage(this.form).then( res => {
                    if(res.status === 'SUCCESS'){
                        this.$message.success(res.msg);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( error => {
                    this.$message.error(error)
                })
            },
            handleAvatarSuccess(res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.form.imageUrl = res.data;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleImageError(res){
                if(res.status === 401){
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        display: block;
    }
</style>