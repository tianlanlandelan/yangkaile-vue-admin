<template>
<el-row>
  <!-- 注册界面 -->
  <el-form :model="registerUser" :rules="registerRoles" ref="registerUser" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">新用户注册</h3>
    <el-form-item style="width:100%;">
      <!-- 步骤条 -->
      <el-steps :active="stepsActive" finish-status="success">
        <el-step title="填写基本信息"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>    
    </el-form-item>
    <!-- 第二步-->
    <el-row v-show="showStep1">
      <el-form-item prop="username">
        <el-input type="text" v-model="registerUser.username" placeholder="请输入邮箱或手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleSendValidateCode">发送验证码</el-button>
      </el-form-item>
    </el-row>
    <!-- 第三步-->
    <el-row v-show="showStep2">
      <el-form-item prop="code">
        <el-input type="text" v-model="registerUser.code" placeholder="请输入收到的验证码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleRegister">提交</el-button>
      </el-form-item>
    </el-row>
    <!-- 第四步-->
    <el-row v-show="showStep3">
      <el-form-item style="width:100%;">
        <el-button type="text"  style="width:100%;">注册成功，正在跳转到登录页面... ...</el-button>
      </el-form-item>
    </el-row>  
  </el-form>
</el-row>
</template>

<script>
  import { req_register ,req_sendSMSVCode,req_sendEmailVCode} from '../api/api';
import { callbackify } from 'util';
  export default {
    data() {
      return {
        //注册用户数据
        registerUser: {
          username: '',
          password: '',
          code: '0'
        },
        //注册验证规则
        registerRoles: {
          username: { required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
          password: { required: true, message: '请输入密码', trigger: 'blur' },
          code: { required: true, message: '请输入验证码', trigger: 'blur' }
        },
        //注册界面步骤条当前步骤Index
        stepsActive:0,
        showStep1:true,
        showStep2:false,
        showStep3:false,
        showEmail:false,
        showPhone:false
      };
    },
    methods: {
      checkUserName(){
        let username = this.registerUser.username;
        var phoneRoles=/^1+\d{10}$/;
        var notPhone = !phoneRoles.test(username);
        if(!notPhone){
          return 0;
        }
        var emailRole  = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var notEmail = !emailRole.test(username);
        if(!notEmail){
          return 1;
        }
        return -1;
      },
      /**
       * 发送验证码
       */
      handleSendValidateCode(){
        let username = this.registerUser.username;
        //验证表单数据
        this.$refs.registerUser.validate((valid) => {
          if (valid) {
            if(this.checkUserName() == 0){
              req_sendSMSVCode(username).then(response => {
                console.log("短信验证码发送完毕，Response:",response);
                this.$message({
                    message: "验证码已发送到您的" + username + "手机号，请注意查收",
                    type: 'success'
                  });
              });
              this.registerUser.code = '';
              this.handleStep();
            }else if(this.checkUserName() == 1){
              req_sendEmailVCode(username).then(response => {
                console.log("邮箱验证码发送完毕，Response:",response);
                this.$message({
                    message: "验证码已发送到您的" + username + "邮箱，请注意查收",
                    type: 'success'
                  });
              });
              this.registerUser.code = '';
              this.handleStep();
            }else{
              this.$message({
                    message: "请输入正确的手机号码或邮箱",
                    type: 'error'
                  });
            }
          }
        });
      },
      //校验验证码
      handleRegister(){
          let user = this.registerUser;
          //验证表单数据
          this.$refs.registerUser.validate((valid) => {
          if (valid) {
            //调用注册接口
            req_register(user.username,user.password,user.code).then(response => {
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
              //注册成功，跳转到登录页面
              } else {
                this.$router.push({ path: '/Logon' });
              }
            });
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
        console.log("user",this.registerUser.username,this.registerUser.password,this.registerUser.rePassword,this.registerUser.code)
        this.stepsActive ++;
        this.showRegister(index);
        if(this.stepsActive === 2){
          setTimeout(()=>{
            console.log("stepsActive = 2");
            this.refush();
            }, 1000 );
          
        }
      },
      refush(){
        this.stepsActive = 3;
        setTimeout(()=>{
            console.log("stepsActive = 3");
            this.$router.push('/Logon');
            }, 1000 );
      }
    }
  }

</script>

<style lang="scss" scoped>
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