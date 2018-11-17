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
					<el-button type="primary" v-on:click="getRoles">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showAddDialog">新增</el-button>
				</el-form-item>
			</el-form>
		 </el-col>
		 <el-col :span="12" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		 </el-col>
		</el-row>

		<!--列表-->
		<el-table :data="roles" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="name" label="角色名称" width="200px" sortable>
			</el-table-column>
			<el-table-column prop="description" label="描述" >
			</el-table-column>
			<el-table-column prop="createTime"  label="创建时间" sortable>
				<template slot-scope="scope">
					<el-date-picker 
						disabled="true"
						v-model="scope.row.createTime"
						type="datetime">
					</el-date-picker>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="small" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--添加/编辑界面-->
		<el-dialog title="添加/编辑" v-model="editDialog.isShow" :close-on-click-modal="false">
			<el-form :model="editDialog.data" label-width="80px" :rules="editDialog.rules" ref="editDialog">
				<el-form-item label="角色名" prop="name">
					<el-input v-model="editDialog.data.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input type="textarea" v-model="editDialog.data.description"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editDialog.isShow = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editDialog.isLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import {req_getRoleList,addRole} from '../../api/api';
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				roles: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				//编辑界面数据
				editDialog:{
					//是否是添加界面
					isAdd: false,
					//是否显示
					isShow: false,
					//提交按钮是否显示加载动画
					isLoading: false,
					//数据编辑规则
					rules: {
						name: [
							{ required: true, message: '角色名不能为空', trigger: 'blur' }
						],
						description: [
							{ required: true, message: '角色描述不能为空', trigger: 'blur' }
						]
					},
					//数据
					data:{
						id: 0,
						name: '',
						description: ''
					}
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getRoles();
			},
			//获取用户列表
			getRoles() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				req_getRoleList().then((res) => {
					console.log('req_getRouterList',res);
					//TODO 分页查询
					this.total = 100;
					this.roles = res.data;
					this.listLoading = false;
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//显示编辑界面
			showEditDialog: function (index, row) {
				this.editDialog.isAdd = false;
				this.editDialog.isShow = true;
				this.editDialog.data = Object.assign({}, row);
			},
			//显示新增界面
			showAddDialog: function () {
				this.editDialog.isAdd = true;
				this.editDialog.isShow = true;
				this.editDialog.data = {
					name: '',
					description: ''
				};
			},
			editSubmit: function () {
				this.$refs.editDialog.validate((valid) => {
					let roleId = this.editDialog.data.id;
					let roleName = this.editDialog.data.name;
					let roleDescription = this.editDialog.data.description;
					console.log("获取界面数据：",this.editDialog.isAdd,roleId,roleName,roleDescription);
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editDialog.isLoading = true;
							//添加操作
							if(this.editDialog.isAdd){
								addRole(roleName,roleDescription).then((res) => {
									this.editDialog.isLoading = false;
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['editDialog'].resetFields();
									this.editDialog.isShow = false;
									this.getRoles();
								});
							//编辑操作
							}else{

							}
							
						});
					}
				});
			},

		},
		mounted() {
			this.getRoles();
		}
	}

</script>