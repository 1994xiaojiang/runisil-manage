<template>
    <div class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span style="font-weight: 600;font-size: 20px;">
                    {{customize.type | pageName}}
                </span>
            </div>
            <div style="width: 900px;margin: 0 auto;">
                <tinymce-editor v-model="content" ref="editor"></tinymce-editor>
            </div>
            <div style="text-align: center;margin-top: 30px;">
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="saveCustomizePage()">保存内容</el-button>
                <el-button type="primary" icon="el-icon-view" style="margin-bottom: 20px;" @click="showdialog()">预览</el-button>
            </div>
        </el-card>
        <el-dialog title="内容预览" :visible.sync="dialogIsShow" width="950px">
            <div v-if="content !== ''" v-html="content" style="width: 900px;margin: 0 auto;color: black;"></div>
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
    import { getCustomizeContent,saveOrupdate } from '@/api/customizePage'

    export default {
        name: "product-edit-page",
        components: {
            TinymceEditor
        },
        data() {
            return {
                customize: {},
                content: '',
                dialogIsShow: false,
            }
        },
        mounted() {
            this.editTayp();
        },
        filters:{
            pageName(val){
                if (val === undefined) return;
                if (val === 0) {
                    return '公司信息'
                } else if (val === 1) {
                    return '法律声明'
                } else if (val === 2) {
                    return '隐私政策'
                } else if (val === 3) {
                    return '处理和物流'
                }
            }
        },
        methods: {
            closeDialog() {
                this.dialogIsShow = false;
            },
            showdialog() {
                this.dialogIsShow = true;
            },
            editTayp() {
                if (this.$route.query.type === 'edit') {
                    this.getCustomizeDetail();
                }
            },
            getCustomizeDetail() {
                getCustomizeContent(this.$route.query.id).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.customize = res.data;
                        this.HTMLDecode(res.data.content);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch( error => {
                    this.$message.error(error);
                })
            },
            HTMLDecode(text) {
                let temp = document.createElement("div");
                temp.innerHTML = text;
                let output = temp.innerText || temp.textContent;
                temp = null;
                this.content = output;
            },
            saveCustomizePage(){
                this.customize.content = this.content;
                saveOrupdate(this.customize).then( res => {
                    if(res.status === 'SUCCESS'){
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch( error => {
                    this.$message.error(error);
                })
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

</style>
