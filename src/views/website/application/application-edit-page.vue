<template>
    <div class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span style="font-weight: 600;font-size: 20px;">编辑应用信息</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="应用标题">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="应用描述">
                                <el-input type="textarea" v-model="form.description" rows="4"></el-input>
                            </el-form-item>
                            <el-form-item label="应用封面" >
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
                            <el-form-item style="text-align: center;">
                                <el-button type="success" icon="el-icon-circle-plus-outline" @click="saveProducts()">保存信息</el-button>
                                <el-button type="primary" icon="el-icon-view" style="margin-bottom: 20px;" @click="showdialog()">预览</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="16">

                    <div style="width: 900px;margin: 0 auto;">
                        <p style="font-size: 14px;margin-bottom: 10px;color: #606266;">应用详情页编辑</p>
                        <tinymce-editor v-model="form.summary" ref="editor"></tinymce-editor>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog title="内容预览" :visible.sync="dialogIsShow" width="950px">
            <div v-if="form.summary !== ''" v-html="form.summary" style="width: 900px;margin: 0 auto;color: black;"></div>
            <div v-else style="width: 100%;text-align: center;">
                <span style="font-size: 16px">暂无内容展示</span>
            </div>
            <div style="width: 100%;text-align: center;padding-top: 20px;">
                <el-button @click="closeDialog()">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import TinymceEditor from '@/components/tinymce/tinymce-editor'
    import { getApplicationAllById,saveOrUpdateApplication } from '@/api/application'

    export default {
        name: "application-edit-page",
        components: {
            TinymceEditor
        },
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                    summary: '',
                    imageUrl: '',
                    id: null
                },
                uploadUrl: process.env.VUE_APP_BASE_API + "manager/uploadImage",
                dialogVisible: false,
                dialogIsShow: false
            }
        },
        mounted() {
            this.editTayp();
        },
        methods: {
            showdialog() {
                this.dialogIsShow = true;
            },
            closeDialog() {
                this.dialogIsShow = false;
            },
            editTayp() {
                if (this.$route.query.type === 'edit') {
                    this.getProductDetail();
                }
            },
            getProductDetail() {
                this.form.id = this.$route.query.id;
                getApplicationAllById(this.form.id).then(res => {
                    this.form.name = res.data.name;
                    this.form.description = res.data.description;
                    this.form.imageUrl = res.data.imageUrl;
                    this.HTMLDecode(res.data.summary);
                }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            HTMLDecode(text) {
                let temp = document.createElement("div");
                temp.innerHTML = text;
                let output = temp.innerText || temp.textContent;
                temp = null;
                this.form.summary = output;
            },
            saveProducts(){
                saveOrUpdateApplication(this.form).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.$message.success(res.msg);
                        this.$router.push("/website/application-page")
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error =>{
                    this.$message.error(error);
                });
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

</style>
<style>
    ol {
        list-style: decimal;
        padding-left: 20px;
    }

    ul {
        list-style: disc;
        padding-left: 20px;
    }
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
