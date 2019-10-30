<template>
    <div>
        <div class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">图片管理</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入图片名称" class="input-style" v-model="search"></el-input>
                    <el-select v-model="selectGroup" placeholder="请选择分组" class="file-select">
                        <el-option label="全部分组" value=""></el-option>
                        <el-option v-for="item in grouplist" :label="item.name" :value="item.name" :key="item.name"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                    <el-button type="info" style="background-color: #409eff;float: right;" @click="dialogVisible = true">上传图片</el-button>
                    <el-button type="primary" style="background-color: #409eff;float: right;" @click="dialogGroup = true">新建分组</el-button>
                </div>
                <el-table :data="tableData" border stripe>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="图片类型：">
                                            <span>{{ props.row.imageType }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="图片大小：">
                                            <span>{{ props.row.size }} KB</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="图片宽度：">
                                            <span>{{ props.row.width }} px</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="图片高度：">
                                            <span>{{ props.row.height }} px</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="ID"
                            prop="id" width="50">
                    </el-table-column>
                    <el-table-column
                            label="图片名称"
                            prop="imageName" width="300">
                    </el-table-column>

                    <el-table-column
                            label="图片地址" width="600">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px;overflow: hidden;text-overflow: ellipsis;
                                -o-text-overflow: ellipsis;
                                white-space:nowrap;
                                width:100px;">{{ scope.row.imageUrl }}</span>
                            <el-button
                                    @click="copyUrl(scope.row.imageUrl)"
                                    type="text"
                                    size="small" style="float: right;">
                                复制
                            </el-button>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="分组"
                            prop="groupName">
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            prop="createTime">
                    </el-table-column>

                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
            <!--新建分组-->
            <el-dialog
                    title="新建分组"
                    :visible.sync="dialogGroup"
                    width="30%">
                <el-form ref="form" :rules="groupRules" :model="form" label-width="80px">
                    <el-form-item label="分组名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="resetGroupForm('form')">取 消</el-button>
                <el-button type="primary" @click="createNewGroup()">确 定</el-button>
              </span>
            </el-dialog>

            <!--上传图片-->
            <el-dialog
                    title="上传图片"
                    :visible.sync="dialogVisible"
                    width="40%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="图片分组" prop="groupName">
                        <el-select v-model="ruleForm.groupName" placeholder="请选择分组">
                            <el-option v-for="item in grouplist" :label="item.name" :value="item.name" :key="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-upload
                        ref="imageUpload"
                        class="upload-demo"
                        drag
                        action=""
                        multiple
                        :auto-upload="false"
                        :http-request="handleRequest">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <div slot="footer" class="dialog-footer" style="text-align: center;">
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitUpload">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getImageList,getGroupList } from '@/api/list'
    import { uploadImage,createGroup } from '@/api/file'
    import ElCollapse from "element-ui/packages/collapse/src/collapse";
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {
            ElButton,
            ElCollapse
        },
        name: "order-list",
        data() {
            return {
                tableData: [],
                search: '',
                selectGroup: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                rowIndex: 0,
                dialogVisible: false,
                dialogGroup: false,
                form:{
                    name: '',
                    type: 1
                },
                ruleForm:{
                    groupName: ""
                },
                rules: {
                    groupName: [
                        { required: true, message: '请选择图片分组', trigger: 'change' }
                    ],
                },
                grouplist:[],
                groupRules: {
                    name:[
                        { required: true, message: '分组名称不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted() {
            this.getImagesList();
            this.getFileGroupList();
        },
        methods: {
            submitUpload() {
                if(this.$refs.imageUpload.uploadFiles.length === 0){
                    this.$message.error("图片不能为空！")
                }else{
                    this.$refs.imageUpload.submit();
                }
            },
            handleRequest(param) {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let fileObj = param.file;
                        // FormData 对象
                        let form = new FormData();
                        // 图片对象
                        form.append("file", fileObj);
                        form.append("groupName", this.form.name);
                        let self = this;
                        uploadImage(form).then((res) => {
                            if (res.status === 'SUCCESS') {
                                self.$message({
                                    message: '上传成功',
                                    type: 'success'
                                });
                                this.getImagesList();
                                this.dialogVisible = false;
                                this.$refs.imageUpload.clearFiles();
                            }
                            else {
                                self.$message.error(message)
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            handleSize(val) {
                this.pageSize = val;
                this.getImagesList();
            },
            handlePage(val) {
                this.currentPage = val;
                this.getImagesList();
            },
            getImagesList() {
                getImageList({current: this.currentPage, size: this.pageSize})
                    .then(res => {
                        if (res.status === 'SUCCESS') {
                            this.tableData = res.data.records;
                            this.total = res.data.total
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            getFileGroupList(){
                getGroupList(1).then(res =>{
                    if (res.status === 'SUCCESS') {
                        this.grouplist = res.data;
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            // 查找
            searchTab() {
                var param = {current:this.currentPage,size:this.pageSize};
                if(this.search != undefined) {
                    param.search = this.search
                }
                if(this.selectGroup !== ""){
                    param.selectGroup = this.selectGroup
                }
                getImageList(param).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(error =>{
                    this.$message.error(error.message)
                });
            },
            copyUrl(value){
                const input = document.createElement('input');
                document.body.appendChild(input);
                input.setAttribute('value', value);
                input.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    this.$message({
                        message: '图片地址复制成功',
                        type: 'success'
                    });
                }
                document.body.removeChild(input);
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.dialogVisible=false;
                this.$refs.imageUpload.clearFiles();
            },
            resetGroupForm(formName){
                this.$refs[formName].resetFields();
                this.dialogGroup=false;
            },
            createNewGroup(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        createGroup(this.form).then( res => {
                            if(res.status === 'SUCCESS'){
                                this.$refs['form'].resetFields();
                                this.dialogGroup=false;
                                this.$message.success("新建分组成功！");
                                this.getFileGroupList();
                            }else{
                                this.$message.error(res.msg)
                            }
                        }).catch(error =>{
                            this.$message.error(error.message)
                        });
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>
<style lang="scss" scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .input-style {
        width: 180px;
        margin-right: 10px;
    }
    .file-select{
        width: 180px;
        margin-right: 10px;
    }
    .searchDiv {
        margin-bottom: 20px;
        .el-button {
            padding: 11px 20px;
        }
    }

</style>

