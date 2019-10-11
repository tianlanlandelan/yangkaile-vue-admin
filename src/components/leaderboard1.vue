<template>
	<div>
		<el-button v-popover:popover1 type="primary" @click="onClick">submit</el-button>
		<el-popover
			ref="popover1"
			placement="top-start"
			width="800"
			trigger="click">
			<div class = "popover-bg">
				<div class = "popover-div">
					<div v-for="score in scores" :key = "score.id">
						<!--其他人成绩的遮罩层-->
						<el-row class = "popover-margin" :style="{width: score.width + '%'}"></el-row>
						<!--其他人成绩-->
						<el-row class = "popover-row">
							<el-col :span="2">
								{{score.sort}}
							</el-col>
							<el-col :span="4">
								<img :src="score.portrait" />
							</el-col>
							<el-col :span="16">
								{{score.name}}
							</el-col>
							<el-col :span="2">
								{{score.score}}
							</el-col>
						</el-row>
						<!--分割栏-->
						<el-row class = "popover-split"></el-row>
					</div>
				</div>
				<div class = "me-bg">
					<el-row class = "me-margin" :style="{width: myScore.width + '%'}"></el-row>
					<!--自己的成绩-->
					<el-row class = "me-row">
						<el-col :span="2">
							6
						</el-col>
						<el-col :span="4">
							<img src="../../static/img/icon.png" />
						</el-col>
						<el-col :span="16">
							You
						</el-col>
						<el-col :span="2">
							40
						</el-col>
					</el-row>
				</div>
				<el-row class = "popover-split"></el-row>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import {testData} from "../data.js";
	export default {
		props:{
			
		},
	  components:{testData},
	  data () {
		return {
		  scores:[],
		  myScore:{
			  width:40
		  }
		}
	  }
	  ,mounted() {
			
	  },methods:{
		  onClick(){
			  this.scores = testData.scores1;
			  console.log("prop",this.scores);
		  }
	  }
	}
</script>

<style>
	.popover-bg{
		background-color: #409EFF;
	}
	.popover-div{
		padding:20px;
		line-height: 30px;
		font-size: 18px;
		color: #FFFFFF;
	}

	.popover-row{
		padding:5px 20px;
		height: 40px;
		margin-top:-40px;
	}
	.popover-row img{
		width: 30px;
		border-radius: 15px;
	}
	.popover-margin{
		background-color: #67C23A;
		height: 40px;
		opacity:0.5;
		border-radius: 10px;
	}
	.popover-split{
		height: 5px;
		background-color: #409EEE;
	}
	.me-bg{
		margin:5px 10px;
		background-color: #EBEEF5;
		border-radius: 10px;
	}
	.me-margin{
		background-color: #DCDFE6;
		height: 50px;
		opacity:0.9;
		border-radius: 10px;
	}
	.me-row{
		padding:5px 10px;
		height: 50px;
		margin-top:-50px;
		font-size: 24px;
		line-height: 40px;
		color:#303133;
	}
	.me-row img{
		width: 40px;
		border-radius: 20px;
	}
	
	
</style>
