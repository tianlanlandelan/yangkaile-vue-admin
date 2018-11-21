<template>
<el-row>
  <!-- 注册界面 -->
  <el-form :model="logonUser" :rules="logonRules" ref="logonUser" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">新用户注册</h3>
    <el-form-item style="width:100%;">
      <!-- 步骤条 -->
      <el-steps :active="stepsActive" finish-status="success">
        <el-step title="选择注册方式"></el-step>
        <el-step title="填写基本信息"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="注册完成"></el-step>
      </el-steps>    
    </el-form-item>
   
    <!-- 第一步-->
    <el-row v-show="showStep1">
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" plain @click="handleStep(0)">手机号注册</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" plain @click="handleStep(1)">邮箱注册</el-button>
      </el-form-item>
    </el-row>
    <!-- 第二步-->
    <el-row v-show="showStep2">
      <el-form-item prop="username">
        <el-input type="text" v-model="logonUser.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text" v-model="logonUser.username" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="logonUser.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="logonUser.password" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleStep">发送验证码</el-button>
      </el-form-item>
    </el-row>
    <!-- 第三步-->
    <el-row v-show="showStep3">
      <el-form-item prop="username">
        <el-input type="text" v-model="logonUser.username" placeholder="请输入收到的验证码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleStep">提交</el-button>
      </el-form-item>
    </el-row>
    <!-- 第四步-->
    <el-row v-show="showStep4">
      <el-form-item style="width:100%;">
        <el-button type="text"  style="width:100%;"  @click="handleStep">注册成功，正在跳转到登录页面... ...</el-button>
      </el-form-item>
    </el-row>  
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
        logining: false,
        //注册界面步骤条当前步骤Index
        stepsActive:0,
        showStep1:true,
        showStep2:false,
        showStep3:false,
        showStep4:false,
        showEmail:false,
        showPhone:false
      };
    },
    methods: {
      showRegister(index){
        this.isShowLogon = false;
        this.isShowRegister = true;
        this.showStep1 = false;
        this.showStep2 = false;
        this.showStep3 = false;
        this.showStep4 = false;
        this.showEmail = false;
        this.showPhone = false;
        if(index == 0){
          this.showEmail = true;
        }else if(index == 1){
          this.showPhone = true;
        }
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
          case 3:
            this.showStep4 = true;
            break;
          }
      },
      handleStep(index){
        this.stepsActive ++;
        this.showRegister(index);
        if(this.stepsActive === 3){
          setTimeout(()=>{
            console.log("stepsActive = 3");
            this.refush();
            }, 1000 );
          
        }
      },
      refush(){
        this.stepsActive = 4;
        setTimeout(()=>{
            console.log("stepsActive = 4");
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