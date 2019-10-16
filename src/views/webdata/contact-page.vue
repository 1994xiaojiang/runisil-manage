<template>
    <div>
        <div v-if="secondpage" class="className">
            <el-card class="anoCard">
                <div slot="header">
                    <span style="font-weight: 600;font-size: 20px;">联系人列表</span>
                </div>
                <div class="searchDiv">
                    <el-input type="text" placeholder="请输入联系人名称" class="width1" v-model="sch_order"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="searchTab()">搜索</el-button>
                </div>

                <el-table :data="tableData" border stripe>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">

                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="姓名">
                                            <span>{{ props.row.firstName + '·' + props.row.surname }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="称呼">
                                            <span>{{ props.row.salutation }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="公司">
                                            <span>{{ props.row.company }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="邮政编码">
                                            <span>{{ props.row.zipCode }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="国家">
                                            <span>{{ props.row.country }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="省份">
                                            <span>{{ props.row.state }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="城市">
                                            <span>{{ props.row.city }}</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12">
                                        <el-form-item label="街道">
                                            <span>{{ props.row.street }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="邮箱">
                                            <span>{{ props.row.email }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="电话">
                                            <span>{{ props.row.phone }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="传真">
                                            <span>{{ props.row.fax }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="移动电话">
                                            <span>{{ props.row.mobilePhone }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="联系公司名称">
                                            <span>{{ props.row.companyName }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="信息">
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
                            label="姓名"
                            prop="(firstName + '·' + surname)">
                    </el-table-column>
                    <el-table-column
                            label="公司"
                            prop="company">
                    </el-table-column>
                    <el-table-column
                            label="邮箱"
                            prop="email">
                    </el-table-column>
                </el-table>
                <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                               :page-size="pageSize" :current-page="currentPage" :total="total"
                               class="fyDiv" @size-change="handleSize" @current-change="handlePage">
                </el-pagination>
            </el-card>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
    import { getProjectPage,getProductsPageByValue,updateStatusProduct } from '@/api/product'
    export default {
        name: "contact-page",
        data() {
            return {
                tableData: [],
                allList: [],
                schArr:[],
                sch_order: '',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
                rowIndex: 0,
            }
        },
        computed:{
            secondpage(){
                return this.$store.state.secondpage;
            }
        },
        mounted() {
            this.getPageTable()
        },
        methods: {
            handleSize(val) {
                this.pageSize = val;
                this.getPageData()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getPageData()
            },
            getPageTable() {
                getProjectPage({current:this.currentPage,size:this.pageSize})
                    .then(res => {
                        if(res.status === 'SUCCESS'){
                            this.allList = res.data.records;
                            this.schArr = this.allList;
                            this.getPageData();
                            this.total = res.data.total
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.$message.error(error.message)
                })
            },
            getPageData() {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = start + this.pageSize;
                this.tableData = this.schArr.slice(start, end)
            },
            // 查找
            searchTab() {
                getProductsPageByValue({current:this.currentPage,size:this.pageSize},
                    this.sch_order,this.sch_status).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.allList = res.data.records;
                        this.schArr = this.allList;
                        this.getPageData();
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.message)
                    }
                }).catch(error =>{
                    this.$message.error(error.message)
                });

                this.getPageData()
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
</style>
