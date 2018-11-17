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
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		 </el-col>
		 <el-col :span="12" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				req_getRouterList().then((res) => {
					console.log('req_getRouterList',res);
					//TODO 分页查询
					this.total = 100;
					this.routers = res.data;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>