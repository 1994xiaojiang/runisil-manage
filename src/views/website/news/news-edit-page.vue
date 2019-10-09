<template>
    <div class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span style="font-weight: 600;font-size: 20px;">编辑产品</span>
            </div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="新闻记者">
                                <el-input v-model="form.editor"></el-input>
                            </el-form-item>
                            <el-form-item label="记者电话">
                                <el-input v-model="form.editorPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="记者邮箱">
                                <el-input v-model="form.editorEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="发布日期">
                                <el-date-picker class="width1" v-model="form.releaseTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="新闻主题">
                                <el-input type="textarea" v-model="form.newsSubject" rows="4"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align: center;">
                                <el-button type="success" icon="el-icon-circle-plus-outline" @click="addOrEditnews()">保存新闻</el-button>
                                <el-button type="primary" icon="el-icon-view" style="margin-bottom: 20px;" @click="showdialog()">预览</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="16">

                    <div style="width: 900px;margin: 0 auto;">
                        <p style="font-size: 14px;margin-bottom: 10px;color: #606266;">新闻详情页编辑</p>
                        <tinymce-editor v-model="form.newsSummary" ref="editor"></tinymce-editor>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog title="内容预览" :visible.sync="dialogIsShow" width="950px">
            <div v-if="form.newsSummary !== ''" v-html="form.newsSummary" style="width: 900px;margin: 0 auto;color: black;"></div>
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
    import { selectNewsById,addOrEditnews } from '@/api/news'

    export default {
        name: "news-edit-page",
        components: {
            TinymceEditor
        },
        data() {
            return {
                form: {
                    editor: '',
                    editorPhone: '',
                    editorEmail: '',
                    releaseTime: '',
                    newsSubject:'',
                    newsSummary:'',
                    id: null
                },
                dialogVisible: false,
                dialogIsShow: false
            }
        },
        mounted(){
            this.selectNewsById();
        },
        methods:{
            selectNewsById(){
                if (this.$route.query.type === 'edit') {
                    this.form.id = this.$route.query.newsId;
                    selectNewsById(this.form.id).then( res => {
                        this.form.editor = res.data.editor;
                        this.form.editorPhone = res.data.editorPhone;
                        this.form.editorEmail = res.data.editorEmail;
                        this.form.releaseTime = res.data.releaseTime;
                        this.form.newsSubject = res.data.newsSubject;
                        this.HTMLDecode(res.data.newsSummary);
                        this.form.id = res.data.id;
                    }).catch(error => {
                        this.$message.error(error.message)
                    })
                }
            },
            addOrEditnews(){
                addOrEditnews(this.form).then(res=>{
                    if(res.status === 'SUCCESS'){
                        this.$message.success(res.msg);
                        this.$router.push("/website/news-page")
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error=>{
                    this.$message.error(error);
                })
            },
            showdialog() {
                this.dialogIsShow = true;
            },
            closeDialog() {
                this.dialogIsShow = false;
            },
            HTMLDecode(text) {
                let temp = document.createElement("div");
                temp.innerHTML = text;
                let output = temp.innerText || temp.textContent;
                temp = null;
                this.form.newsSummary = output;
            },
        }

    }
</script>

<style scoped>

</style>
