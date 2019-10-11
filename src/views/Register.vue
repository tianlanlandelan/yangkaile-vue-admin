<template>
<el-row>
  <!-- 注册界面 -->
  <el-form  
	label-position="left" 
	label-width="0px" 
	class="demo-ruleForm login-container">
    <h3 class="title">Welcome to New User Signup</h3>
    <!-- <el-form-item style="width:100%;">
      
      <el-steps :active="stepsActive" finish-status="success">
        <el-step title="Basic information"></el-step>
        <el-step title="Authentication "></el-step>
       <el-step title="Set UserName"></el-step>
      </el-steps>    
    </el-form-item> -->
    <!-- 第一步-->
    <el-row v-show="showStep1">
		<el-form-item>
			<el-row>
				<el-col :span="12">Sign up with your UNID</el-col>
				<el-col :span="12" v-show="isShow.sid"></el-col>
			</el-row>
		  <el-input type="text" v-model="user.sid"  placeholder="u1145615"></el-input>
		  <el-row>
		  	<el-col :span="12">Sign up with your umail</el-col>
		  	<el-col :span="12" v-show="isShow.email"></el-col>
		  </el-row>
		  <el-input type="text" v-model="user.email" placeholder="u1145615@YourUniversity.edu"></el-input>
		  <el-row>
		  	<el-col :span="12">Set Password</el-col>
		  	<el-col :span="12" v-show="isShow.password"></el-col>
		  </el-row>
		  <el-input type="password" v-model="user.password" placeholder="Set Password"></el-input>
		</el-form-item>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">Next</el-button>
      </el-form-item>
    </el-row>
    <!-- 第二步-->
    <!-- <el-row v-show="showStep2">
      <el-form-item prop="code">
        <el-input type="text" v-model="user.code" placeholder="Input Verification Code"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">Submit</el-button>
      </el-form-item>
    </el-row> -->
    <!-- 第三步-->
    <el-row v-show="showStep2">
		<el-form-item >
		  <el-input type="text" v-model="user.firstName" placeholder="Input Your First Name"></el-input>
		</el-form-item>
		<el-form-item >
		  <el-input type="text" v-model="user.lastName" placeholder="Input Your Last Name"></el-input>
		</el-form-item>
		<el-form-item style="width:100%;">
		  <el-row >
			  <el-col :span="12">
				  <el-row>
					<el-button type="primary" style="width:100%;"  v-popover:popover @click="handleSelect">Select an avatar</el-button>  
					</el-row>
				  <el-row class="margin" v-show="showSelected">
					  <el-button type="primary"  style="width:100%;" @click="handleSubmit">Submit</el-button>
				  </el-row>
				  
			  </el-col>
		  	   <el-col class="center" :span="12" v-show="showSelected">
					<img width="100px" :src="'../../static/icon/' + user.avatarId + '.png'"/>
		  	   </el-col>
		  </el-row>
		  
		</el-form-item>
		<el-popover
		  ref="popover"
		  placement="bottom-start"
		  width="400"
		  trigger="click"
		  :value=showIcon
		  >
		  <el-row class="popover">
			  <el-col class="icon_col center" :span="4" v-for="i in 12" :key = "i">
				  <img width="90%" :src="'../../static/icon/' + i + '.png'" @click="handleSelectIcon(i)" />
			  </el-col>
		  </el-row>
		</el-popover>
    </el-row>  
  </el-form>
</el-row>
</template>

<script>
	import {req_register,req_updateUserInfo} from '../api/api';
  export default {
    data() {
      return {
		  showIcon:true,
		  showSelected:false,
        //注册用户数据
        user: {
		  id:0,
		  type:1,
          sid: '',
          email: '',
          password: '',
		  code:'',
		  firstName:'',
		  lastName:'',
		  avatarId:0
        },
		//控制是否显示的一系列开关
		isShow:{
			sid:false,
			email:false,
			password:false
		},
        //注册界面步骤条当前步骤Index
        stepsActive:0,
        showStep1:true,
        showStep2:false,
        showStep3:false,
		dialogImageUrl: '',
		dialogVisible: false,
      };
    },
    methods: {
      /**
       * 发送验证码
       */
      handleSendCode(){
		//TODO 发送验证码之前，先校验学号、邮箱是否已注册
		console.log("学号",this.user.sid,"学校邮箱",this.user.email,"密码",this.user.password);
		this.handleStep(2);
      },
      //校验验证码
      handleRegister(){
		
		 //调用注册接口
		 req_register(this.user).then(response => {
		   //解析接口应答的json串
		   let { data, message, success } = response;
		    console.log("登录完毕，Response:",data,message,success);
		   //应答不成功，提示错误信息
		   if (success !== 0) {
		     this.$message({
		       message: message,
		       type: 'error'
		     });
		   } else{
			   this.user.id = data;
			   this.handleStep(2);
		   }
		 });
				
      },
	  
      showRegister(index){
        this.showStep1 = false;
        this.showStep2 = false;
        this.showStep3 = false;
        switch (this.stepsActive)
          {
          case 0:
            this.showStep1 = true;
            break;
          case 1:
            this.showStep2 = true;
            break;
          case 2:
            this.showStep3 = true;
            break;
          }
      },
      handleStep(index){
        this.stepsActive ++;
        this.showRegister(index);  
       },
	   handleSelect(){
		   this.showIcon = true;
	   },
	   handleSelectIcon(i){
		   console.log("已选择头像",i,this.showIcon);
		   this.showIcon = false;
		   this.showSelected = true;
		   this.user.avatarId = i;
		   console.log(i,this.showIcon);
	   },
	   handleSubmit(){
		   req_updateUserInfo(this.user).then(response => {
				   //解析接口应答的json串
				   let { data, message, success } = response;
				    console.log("req_updateUserInfo success",data,message,success);
				   //应答不成功，提示错误信息
				   if (success !== 0) {
				     this.$message({
				       message: message,
				       type: 'error'
				     });
				   } else{
					   this.$router.push({ path: '/Login' });
				   }
				 });
	   }
    }
  }

</script>

<style lang="scss" scoped>
	.center{
		text-align: center;
	}
	.popover{
		background-color: #F2F6FC;
		border-radius: 20px;
		padding: 10px;
	}
	.icon_col:hover{
		background-color: #009eff;
	}
	.margin{
		margin-top:20px;
	}
	
	
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>