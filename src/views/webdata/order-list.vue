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
                                            <span>{{ props.row.first_name + '·' + props.row.surname }}</span>
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
                                            <span>{{ props.row.zip_code }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="传真：">
                                            <span>{{ props.row.fax }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="移动电话：">
                                            <span>{{ props.row.mobile_phone }}</span>
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
                    <el-table-column label="样品名称" prop="product" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="样品规格" prop="quantity" width="100">
                    </el-table-column>
                    <el-table-column label="公司名称" prop="company" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="邮箱" prop="email">
                    </el-table-column>
                    <el-table-column label="时间" prop="create_time">
                    </el-table-column>
                    <el-table-column label="状态" prop="status">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status | tagClass">
                                {{scope.row.status | statusText}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button type="warning" @click="sendProduct(scope.row)"
                                       :disabled="scope.row.status === 1">已发货</el-button>
                            <el-button type="success" @click="sureProduct(scope.row)"
                                       :disabled="scope.row.status === 2">确认收货</el-button>
                        </template>
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
    import { getSampleOrderList,updateStatusSample } from '@/api/list'
    export default {
        name: "order-list",
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
        filters: {
            statusText(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return '待处理'
                } else if (val === 1) {
                    return '已发货'
                } else if (val === 2) {
                    return '确认收货'
                }
            },
            tagClass(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return 'info'
                } else if (val === 1) {
                    return 'warning'
                } else if (val === 2) {
                    return 'success'
                }
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
                getSampleOrderList({current:this.currentPage,size:this.pageSize})
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
            sendProduct(row) {
                updateStatusSample({id:row.id,status:1}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this.getPageTable();
                        this.$notify({
                            title: '成功',
                            message: '样品订单状态修改成功',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            sureProduct(row) {
                updateStatusSample({id:row.id,status:2}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this.getPageTable();
                        this.$notify({
                            title: '成功',
                            message: '样品订单状态修改成功',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            // 查找
            searchTab() {
                var param;
                if(this.search != undefined){
                    param = {current:this.currentPage,size:this.pageSize,search:this.search}
                }else{
                    param = {current:this.currentPage,size:this.pageSize}
                }
                getSampleOrderList(param).then(res => {
                    if(res.status === 'SUCCESS'){
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.message)
                    }
                }).catch(error =>{
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

