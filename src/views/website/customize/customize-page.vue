<template>
    <div v-if="secondpage" class="className">
        <el-card class="anoCard">
            <div slot="header">
                <span style="font-weight: 600;font-size: 20px;">自定义页面列表</span>
            </div>
            <el-table :data="tableData" border stripe>
                <el-table-column prop="id" label="页面ID" width="80"></el-table-column>
                <el-table-column prop="type" label="页面名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.type | pageName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | tagClass">
                            {{scope.row.status | statusText}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="editTable(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="success" @click="toSuccess(scope.row)"
                                   :disabled="scope.row.status === 1">发布</el-button>
                        <el-button type="danger" @click="toDelete(scope.row)"
                                   :disabled="!(scope.row.status === 1 && scope.row.status !== 0)">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total, sizes, prev, pager, next" :page-sizes="pageSizes"
                           :page-size="pageSize" :current-page="currentPage" :total="total"
                           class="fyDiv" @size-change="handleSize" @current-change="handlePage">
            </el-pagination>
        </el-card>
    </div>
    <router-view v-else></router-view>
</template>

<script>
    import { getCustomizePageList,addOrEditPage } from '@/api/customizePage'

    export default {
        name: "customize-page",
        data(){
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 20, 30, 40],
            }
        },
        computed:{
            secondpage(){
                return this.$store.state.secondpage;
            }
        },
        filters:{
            statusText(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return '草稿'
                } else if (val === 1) {
                    return '发布中'
                } else if (val === 2) {
                    return '已下架'
                }
            },
            tagClass(val) {
                if (val === undefined) return;
                if (val === 0) {
                    return 'warning'
                } else if (val === 1) {
                    return 'success'
                } else if (val === 2) {
                    return 'danger'
                }
            },
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
        mounted(){
            this.getCustomizePageList();
        },
        methods:{
            handleSize(val) {
                this.pageSize = val;
                this.getPageData()
            },
            handlePage(val) {
                this.currentPage = val;
                this.getPageData()
            },
            getCustomizePageList(){
                getCustomizePageList({current:this.currentPage,size:this.pageSize}).then(res => {
                    if(res.status === 'SUCCESS'){
                        let start = (this.currentPage - 1) * this.pageSize;
                        let end = start + this.pageSize;
                        this.tableData = res.data.records.slice(start, end);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            },
            toSuccess(row) {
                addOrEditPage({id:row.id,status:1}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this.getCustomizePageList();
                        this.$notify({
                            title: '成功',
                            message: '该网页内容已成功发布到网站',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            toDelete(row) {
                addOrEditPage({id:row.id,status:2}).then( res=>{
                    if(res.status === 'SUCCESS'){
                        this.getCustomizePageList();
                        this.$notify({
                            title: '成功',
                            message: '该网页内容已成功从网站下架',
                            type: 'success'
                        })

                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(error => {
                    this.$message.error(error);
                });
            },
            // 编辑
            editTable(index, row) {
                this.$router.push({
                    path: "/website/customize-page/customize-edit-page?type=edit&id=" + row.id
                })
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
</style>
