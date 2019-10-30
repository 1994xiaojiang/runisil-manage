<template>
    <div>
        <div class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">联系地址列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入公司名称" class="width1" v-model="search"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addContactInfo">添加</el-button>
                </div>

                <el-table :data="tableData" border stripe>
                    <el-table-column prop="id" label="ID" width="80"></el-table-column>
                    <el-table-column prop="name" label="公司名称" width="250" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                    <el-table-column prop="fax" label="传真" width="150"></el-table-column>
                    <el-table-column prop="phone" label="电话" width="150"></el-table-column>
                    <el-table-column prop="region" label="地区" width="100"></el-table-column>
                    <el-table-column prop="country" label="国家" width="100"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="editContactInfo(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
            <el-dialog
                    title="编辑联系信息"
                    :visible.sync="diaIsShow"
                    width="40%">
                <el-form :model="form" ref="form" label-width="100p" style="vertical-align:middle;">
                    <el-form-item
                            prop="name"
                            label="公司名称"
                            :rules="[
                              { required: true, message: '请输入公司名称', trigger: 'blur' },
                            ]">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="address"
                            label="地址"
                            :rules="[
                              { required: true, message: '请输入公司地址', trigger: 'blur' },
                            ]">
                        <el-input type="textarea" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[
                              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                            ]">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="fax"
                            label="传真"
                            :rules="[
                              { required: true, message: '请输入传真', trigger: 'blur' },
                            ]">
                        <el-input v-model="form.fax"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="phone"
                            label="联系电话"
                            :rules="[
                              { required: true, message: '请输入联系电话', trigger: 'blur' },
                            ]">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="region"
                            label="地区"
                            :rules="[
                              { required: true, message: '请输入地区', trigger: 'blur' },
                            ]">
                        <el-input v-model="form.region"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="country"
                            label="国家"
                            :rules="[
                              { required: true, message: '请输入国家', trigger: 'blur' },
                            ]">
                        <el-input v-model="form.country"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align: center;">
                        <el-button @click="resetForm('form')">重置</el-button>
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>

                    </el-form-item>
                </el-form>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getContactPage,saveOrUpdataContact } from '@/api/contact'
    export default {
        name: "contact-page",
        data() {
            return {
                tableData: [],
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                diaIsShow: false,
                rowIndex: 0,
                form:{
                    name: '',
                    email: '',
                    address: '',
                    fax: '',
                    phone: '',
                    country: '',
                    region: ''
                }
            }
        },
        mounted() {
            this.getCompanyList()
        },
        methods: {
            handleSize(val) {
                this.pageSize = val;
                this.getCompanyList()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getCompanyList()
            },
            getCompanyList() {
                getContactPage({current:this.currentPage,size:this.pageSize})
                    .then(res => {
                        if(res.status === 'SUCCESS'){
                            this.tableData = res.data.records;
                            this.total = res.data.total
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            // 查找
            searchTab() {
                getContactPage({current:this.currentPage,size:this.pageSize,search:this.search}).then(res => {
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
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        saveOrUpdataContact(this.form).then( res => {
                            if(res.status === 'SUCCESS'){
                                this.$message.success("联系信息添加成功");
                                this.getCompanyList();
                                this.diaIsShow = false;
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
            },
            resetForm(form){
                this.$refs[form].resetFields();
            },
            // add
            addContactInfo() {
                this.diaIsShow = true;
            },
            // 编辑
            editContactInfo(index, row) {
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.email = row.email;
                this.form.address = row.address;
                this.form.fax = row.fax;
                this.form.phone = row.phone;
                this.form.country = row.country;
                this.form.region = row.region;
                this.diaIsShow = true;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .fyDiv {
        float: right;
        margin-top: 30px;
        padding-bottom: 20px;
    }
    .anoCard .el-table .el-button {
        padding: 8px 18px;
        font-size: 12px;
    }
    .searchDiv {
        margin-bottom: 20px;
        .el-button {
            padding: 11px 20px;
        }
    }
    .width1 {
        width: 180px;
        margin-right: 10px;
    }
    .diaForm {
        .el-input {
            width: 350px;
        }
    }
</style>
<style lang="scss">
    .anoCard {
        .el-card__body:after {
            content: '';
            clear: both;
            width: 0;
            height: 0;
            visibility: hidden;
            display: block;
        }
    }
    .diaForm .el-form-item__label {
        padding-right: 20px;
    }
    .searchDiv [class^='el-icon'] {
        color: #fff;
    }
</style>

