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
		<el-table :data="routers" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="接口名称" sortable>
			</el-table-column>
			<el-table-column prop="requestType" width="200" label="请求方式" >
			</el-table-column>
			<el-table-column prop="routerUrl" label="请求地址" >
			</el-table-column>
			<el-table-column prop="serviceName" label="组件名" >
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
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
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
			},
			selsChange: function (sels) {
				this.sels = sels;
			},

		},
		mounted() {
			this.getUsers();
		}
	}

</script>