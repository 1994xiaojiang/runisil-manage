<template>
    <div>
        <div class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">联系人列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入公司名称" class="input-style" v-model="search"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                </div>

                <el-table :data="tableData" border stripe>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="姓名：">
                                            <span>{{ props.row.firstName + '·' + props.row.surname }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="邮箱：">
                                            <span>{{ props.row.email }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="称呼：">
                                            <span>{{ props.row.salutation }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="公司名称：">
                                            <span>{{ props.row.company }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="国家：">
                                            <span>{{ props.row.country }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="省份：">
                                            <span>{{ props.row.state }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="城市：">
                                            <span>{{ props.row.city }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="街道：">
                                            <span>{{ props.row.street }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="邮政编码：">
                                            <span>{{ props.row.zipCode }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="传真：">
                                            <span>{{ props.row.fax }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="移动电话：">
                                            <span>{{ props.row.mobilePhone }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="电话：">
                                            <span>{{ props.row.phone }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="信息：">
                                    <span>{{ props.row.message }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="id"
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            label="姓氏"
                            prop="surname">
                    </el-table-column>
                    <el-table-column
                            label="名字"
                            prop="firstName">
                    </el-table-column>
                    <el-table-column
                            label="公司名称"
                            prop="company">
                    </el-table-column>
                    <el-table-column
                            label="邮箱"
                            prop="email">
                    </el-table-column>
                    <el-table-column
                            label="时间"
                            prop="createTime">
                    </el-table-column>
                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    import { getContactList } from '@/api/list'
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
                rowIndex: 0,
            }
        },
        mounted() {
            this.getPageTable()
        },
        methods: {
            handleSize(val) {
                this.pageSize = val;
                this.getPageTable()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getPageTable()
            },
            getPageTable() {
                getContactList({current:this.currentPage,size:this.pageSize},"contact")
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
                getContactList({current:this.currentPage,size:this.pageSize},"contact",this.search)
                    .then(res => {
                        if(res.status === 'SUCCESS'){
                            this.tableData = res.data.records;
                            this.total = res.data.total
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.$message.error(error.message)
                });
            },
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
    .input-style{
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
