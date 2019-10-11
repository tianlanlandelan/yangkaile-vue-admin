<template>
<el-row class="container">
	<!-- 页头 -->
	<el-row>
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo">
				{{sysName}}
			</el-col>
			<!-- <el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col> -->
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="mymessage">我的消息</el-dropdown-item>
						<el-dropdown-item @click.native="mysetting">设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="mylogout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
	</el-row>
	
	<!-- 页面内容 -->
	<el-row>
		<!--左侧导航-->
		<el-col :span="4" class= "left-bar">
			<!-- <img class="portrait" :src="this.sysUserAvatar" />  -->
			<el-collapse v-model="activeName">
				<el-collapse-item :name="topic.id" v-for="topic in topics" :key="topic.id">
					<template slot="title">
						<div class="topic">
							{{topic.title}}
							<i v-if="topic.status === 2" class="el-icon-success Success " ></i>
							<i v-if="topic.status === 1" class="el-icon-loading Blue " ></i>
							<i v-if="topic.status === 0" class="el-icon-remove-outline Info " ></i>
						</div>
					</template>
					<div class="subtopic" v-for="subtopic in topic.subtopics" :key="subtopic.id"
						@click="showSubTopic(subtopic)">
						{{subtopic.title}}
						<i v-if="subtopic.status === 2" class="el-icon-success Success " ></i>
						<i v-if="subtopic.status === 1" class="el-icon-loading Blue " ></i>
						<i v-if="subtopic.status === 0" class="el-icon-remove-outline Info " ></i>		
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-col>

		<!--右侧内容-->
		<el-col :span="20" class="right-content">
			<!--步骤条-->
			<el-row>
				<el-col>
					<el-steps :active="1" >
						<el-step :title="sub.title" 
							v-for="sub in currentTopic" :key="sub.id">
						</el-step>
					</el-steps>
				</el-col>
			</el-row>
			<!--课程内容-->
			<el-row>
				<el-col>
					<div class="split"><i class="el-icon-tickets"></i> Python For Beginners</div>
					<video src="http://127.0.0.1:8088/images/video/20191003065346873.mp4" controls="controls">
					您的浏览器不支持 video 标签。
					</video>
					<p>Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. It's also easy for beginners to use and learn, so jump in!</p>
					<p>Installing Python is generally easy, and nowadays many Linux and UNIX distributions include a recent Python. Even some Windows computers (notably those from HP) now come with Python already installed. If you do need to install Python and aren't confident about the task you can find a few notes on the BeginnersGuide/Download wiki page, but installation is unremarkable on most platforms.</p>
					<p>Before getting started, you may want to find out which IDEs and text editors are tailored to make Python editing easy, browse the list of introductory books, or look at code samples that you might find helpful.</p>
					<p>There is a list of tutorials suitable for experienced programmers on the BeginnersGuide/Tutorials page. There is also a list of resources in other languages which might be useful if English is not your first language.</p>
				</el-col>
			</el-row>
			<!--问题标题-->
			<el-row>
				<el-col>
					<div class="split"><i class="el-icon-question"></i> Exercise</div>
					<h3>When to use Python？</h3>
					<p>Python is a pretty versatile language.For which applications can you use Python?</p>
				</el-col>
			</el-row>
			<!--问题选项-->
			<el-row>
				<el-col>
					<div class="split"><i class="el-icon-edit-outline"></i> Possible Answers</div>
					<el-radio-group class="options"  v-model="chosen" size="small" v-for="option in options" :key="option.id" @change="optionsChanged">
						<el-radio :label="option.title">{{option.text}}</el-radio>
					</el-radio-group>
				</el-col>
			</el-row>
			<!--LeaderBoard1-->
			<el-row>
				<LeaderBoard1></LeaderBoard1>
			</el-row>
			<!--答案与解析-->
		</el-col>
	</el-row>

</el-row>
</template>

<script>
	import LeaderBoard1 from "../components/leaderboard1.vue";
	import {testData} from "../data.js";
	export default {
		components:{LeaderBoard1,testData},
		data() {
			return {
				sysName:'内部培训',
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				topics:testData.topics,
				//折叠面板导航栏默认打开页面
				activeName: 1001,
				currentTopic:testData.currentTopic,
				//备选项
				options:testData.options,
				chosen:""
			}
		},
		methods: {
			//控制左侧导航栏展开收起
			collapse(){
				this.isCollapse=!this.isCollapse;
			},
			onSubmit() {
				console.log('submit!');
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			//个人消息
			mymessage(){
				console.log("个人消息");
			},
			//设置
			mysetting(){
				console.log("设置");
			},
			//退出登录
			mylogout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			showSubTopic(subtopic){
				console.log("showSubTopic",subtopic.id,subtopic.status,subtopic.title);
				if(subtopic.status === 0){
					this.warningCannotStudy();
				}
			}
			,
			warningCannotStudy(){
				this.$notify({
				title: '您不能开始学习本课程',
				message: '只有学完了本课程之前的全部课程内容，才能开始本课程的学习',
				type: 'warning'
				});
			},
			optionsChanged(label){
				console.log("选择了",label);
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		}
	}

</script>
<style scoped lang="scss">
	@import '~scss_vars';
	
	.portrait{
		width: 120px;
		height: 120px;
		border-radius: 40px;
		margin: 10px 0px 10px 10px;
	}
	.left-bar{
		padding-left: 20px;
	}
	.topic{
		font-size: 24px;
	}
	.subtopic{
		padding-left: 20px;
		font-size: 18px;
	}
	.right-content{
		padding:20px;
	}
	.options{
		display:block;
		line-height: 30px;
	}
	.split{
		background-color: #DCDFE6;
		line-height: 30px;
		font-size:18px;
		
	}

	.Success{
		color:#67C23A;
	}
	.Blue{
		color:#409EFF;
	}
	.Info{
		color:#909399;
	}

	.iBig{
		font-size: 24px;
	}







	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>
