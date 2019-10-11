<template>
  <el-row>
    <el-form :model="logonUser" :rules="logonRules" 
		ref="logonUser" label-position="left" 
		label-width="0px" class="demo-ruleForm login-container"
		>
		  <h3 class="title">系统登录</h3>
		    <!-- 用户名输入框 -->
		    <el-form-item prop="username">
		      <el-input type="text" v-model="logonUser.username" auto-complete="off" placeholder="用户名、手机号、邮箱"></el-input>
		    </el-form-item>
		    <!-- 密码输入框 -->
		    <el-form-item prop="password">
		      <el-input type="password" v-model="logonUser.password" auto-complete="off" placeholder="密码"></el-input>
		    </el-form-item>
		    <!-- 忘记密码和新用户注册按钮 -->
		    <el-form-item>
		      <el-col :span="12">
		        <el-button type="text" @click="showRegister">忘记密码？</el-button>
		      </el-col>
		      <el-col :span="12">
		        <el-button type="text" @click="showRegister">新用户注册</el-button>
		      </el-col>
		    </el-form-item>
		    <!-- 登录按钮 -->
		    <el-form-item style="width:100%;">
		      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogon" :loading="logining">登录</el-button>
		    </el-form-item>
		  </el-form> 
  </el-row>
</template>

<script>
  import { req_logon } from '../api/api';
  export default {
    data() {
      return {
        //登录用户数据
        logonUser: {
          username: '',
          password: ''
        },
        //登录验证规则
        logonRules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        //登录按钮是否显示加载动画
        logining: false
      };
    },
    methods: {
      //登录操作
      handleLogon(ev) {
        //验证表单内容是否符合规则
        this.$refs.logonUser.validate((valid) => {
          if (valid) {
            //显示加载动画
            this.logining = true;
            //调用登录接口，上传用户名和密码
            req_logon(this.logonUser.username,this.logonUser.password).then(response => {
              console.log("登录完毕，Response:",response);
              this.logining = false;
              //解析接口应答的json串
              let { data, message, success } = response;
              //应答不成功，提示错误信息
              if (success !== 0) {
                this.$message({
                  message: message,
                  type: 'error'
                });
              //应答成功，将用户信息缓存起来。跳转到默认页面
              } else {
                let user =   {id: data.id,avatar: '../../static/img/icon.png',name: data.nickName};
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/Home' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showRegister(){
        console.log('showRegister');
        this.$router.push('/Register');
        console.log('RouterList',this.$router);
      }
    },mounted(){
		
	}
  }

</script>

<style lang="scss" scoped>
	html{
		font-size: 16px;
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
  }
  .login-container .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .login-container .remember {
      margin: 0px 0px 35px 0px;
    }
  
  .sm-login-form {
	font-size: 4rem;
    border-radius: 5px;
    background-clip: padding-box;
    width: 100%;
	margin-top:200px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .sm-login-form .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
	font-size: 4rem;
  }
  .sm-login-form .title img{
	  width: 50%;
	  height: 4rem;
  }
  .sm-login-form .input{
  	  width: 70%;
  	  border: none;
	
	  font-size: 4rem;
  }
  
  .sm-login-form .input:focus{
    outline: 0;
	border: none;
}
  .sm-login-form .remember {
    margin: 0px 0px 35px 0px;
  }
  .sm-div{
	  border-bottom: 4px solid #cac6c6;
	  padding: 1rem;
	  
  }
  .sm-div:hover{
  	  border-bottom: 4px solid #66afe9;

  }
  .sm-font{
	 font-size: 4rem; 
  }
</style>