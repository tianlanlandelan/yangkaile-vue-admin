<template>
<el-row>
  <!-- 登录界面-->
  <el-form :model="logonUser" :rules="logonRules" ref="logonUser" label-position="left" label-width="0px" class="demo-ruleForm login-container">
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
    <el-col :span="12">
      <el-button type="text">忘记密码？</el-button>
    </el-col>
    <el-col :span="12">
      <el-button type="text">新用户注册</el-button>
    </el-col>
    <!-- 登录按钮 -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogon" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>

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
    <el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" plain @click="handleStep">手机号注册</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" plain @click="handleStep">邮箱注册</el-button>
      </el-form-item>
    </el-row>
    <!-- 第二步-->
    <el-row>
      <el-form-item prop="username">
        <el-input type="text" v-model="logonUser.username" placeholder="请输入手机号"></el-input>
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
    <el-row>
      <el-form-item prop="username">
        <el-input type="text" v-model="logonUser.username" placeholder="请输入收到的验证码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary"  style="width:100%;" @click="handleStep">提交</el-button>
      </el-form-item>
    </el-row>
    <!-- 第四步-->
    <el-row>
      <el-form-item style="width:100%;">
        <el-button type="text"  style="width:100%;"  @click="handleStep">注册成功，自动登录中... ...</el-button>
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
                this.$router.push({ path: '/RouterList' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleStep(){
        this.stepsActive ++;
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