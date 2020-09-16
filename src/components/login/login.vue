<template>
  <div class="body-temp">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div class="form-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')" :loading= 'logining'>登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {requestLogin} from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过 可以提交
          this.logining = true
          // 将提交的数据进行封装
          var loginParams = {name: this.ruleForm.name, password: this.ruleForm.password}
          // 调用函数  传递参数 获取结果
          requestLogin(loginParams).then(res => {
            this.logining = false
            if (res.data.code === 200) {
              // 登录成功
              sessionStorage.setItem('access-token', res.data.data.token)
              sessionStorage.setItem('sessionId', res.data.data.sessionId)
              // 用vue路由跳转到后台主界面
              this.$router.push({
                path: '/home',
                params: loginParams
              })
            } else {
              this.$message({
                message: res.errorMsg,
                type: 'error'
              })
            }
          }).catch(res => {
            this.logining = false
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-login {
      display: flex;
      justify-content: center;
      margin: 150px 200px 0px 200px;
      background-color: rgb(22, 190, 112);
    }
    .demo-ruleForm{
      margin-top: 30px;
    }
</style>
