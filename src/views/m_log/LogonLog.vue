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
					<el-button type="primary" v-on:click="getDataList">查询</el-button>
				</el-form-item>
			</el-form>
		 </el-col>
		 <el-col :span="12" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		 </el-col>
		</el-row>
                
		<!--列表-->
		<el-table :data="dataList" highlight-current-row v-loading="listLoading"  style="width: 100%;">
			<el-table-column prop="userId" label="用户ID"  sortable>
			</el-table-column>
			<el-table-column prop="type" width="120px" label="登录/登出" sortable>
			</el-table-column>
			<el-table-column prop="ip"   label="IP地址" >
			</el-table-column>
			<el-table-column prop="way"   label="登录方式" >
			</el-table-column>
			<el-table-column prop="createTime"  label="操作时间" sortable>
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
	import {req_getLogonLogList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				dataList: [],
				total: 0,
				page: 1,
				pageSize: 10,
				listLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getDataList();
			},
			//获取登录日志列表
			getDataList() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				req_getLogonLogList(this.page,this.pageSize).then((res) => {
					console.log('req_getLogonLogList',res);
					let response = res.data;
					if(response.total != 0){
						this.total = response.total;
					}
					this.dataList = response.data;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getDataList();
		}
	}

</script>