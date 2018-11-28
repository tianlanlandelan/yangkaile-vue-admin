<template>
	<section>
		<!--工具条-->
		<el-row>
		 <el-col :span="12" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getRouters">查询</el-button>
				</el-form-item>
			</el-form>
		 </el-col>
		 <el-col :span="12" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		 </el-col>
		</el-row>

		<!--列表-->
		<el-table :data="routers" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="name" label="接口名称"  sortable>
			</el-table-column>
			<el-table-column prop="requestType" width="120px" label="请求方式" sortable>
			</el-table-column>
			<el-table-column prop="routerUrl"   label="请求地址" >
			</el-table-column>
			<el-table-column prop="serviceName" label="组件名"  sortable>
			</el-table-column>
			<el-table-column prop="parameters"  label="参数" >
			</el-table-column>
			<el-table-column prop="description" label="描述" >
			</el-table-column>
			<el-table-column prop="createTime"  label="创建时间" sortable>
				<template slot-scope="scope">
					<el-date-picker 
						disabled
						v-model="scope.row.createTime"
						type="datetime">
					</el-date-picker>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { req_getRouterList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				routers: [],
				total: 0,
				page: 1,
				pageSize: 5,
				listLoading: false,
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getRouters();
			},
			//获取用户列表
			getRouters() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				req_getRouterList(this.page,this.pageSize).then((res) => {
					console.log('req_getRouterList',res);
					let response = res.data;
					if(response.total != 0){
						this.total = response.total;
					}
					this.routers = response.data;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getRouters();
		}
	}

</script>