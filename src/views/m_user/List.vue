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
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="userPortrait" width="100px" label="头像" >
			</el-table-column>
			<el-table-column prop="nickName" label="昵称" sortable>
			</el-table-column>
			<el-table-column prop="gender" width="100px" label="性别" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="address" label="住址" sortable>
			</el-table-column>
			<el-table-column prop="signature" label="签名">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话" sortable>
			</el-table-column>
			<el-table-column prop="birthday" label="生日" sortable>
				<template slot-scope="scope">
					<el-date-picker 
						disabled="true"
						v-model="scope.row.birthday"
						type="datetime">
					</el-date-picker>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" sortable>
				<template slot-scope="scope">
					<el-date-picker 
						disabled="true"
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
	import { req_getUserInfoList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
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
			//性别显示转换
			formatSex: function (row, column) {
				return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
			},
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
				req_getUserInfoList().then((res) => {
					console.log('req_getUserInfoList',res);
					//TODO 分页查询
					this.total = 100;
					this.users = res.data;
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