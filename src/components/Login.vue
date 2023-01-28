<template>
  <div>
    <div class="bg-banner" />
    <div id="login-box">
      <div class="login-banner">
        <img :src="banner" class="banner">
      </div>
      <el-form v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on">
        <div class="title-container">
          <h3 class="title">欢迎来到音乐下载室 ! 👋🏻</h3>
        </div>
        <div>
          <el-form-item prop="username">
            <el-input ref="name" v-model="loginForm.username" placeholder="用户名" text tabindex="1" autocomplete="on">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" autocomplete="on" @keyup.enter="handleLogin">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
              <template #suffix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="flex-bar">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
<!--          <el-link type="primary" :underline="false" @click="formType = 'reset'">忘记密码了?</el-link>-->
        </div>
        <el-button :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">登录</el-button>
        <div class="sub-link">
          <span class="text">还没有帐号?</span>
          <el-link type="primary" :underline="false" @click="formType = 'register'">创建新帐号</el-link>
        </div>
        <div style="margin-top: 20px; margin-bottom: -20px; text-align: center;">
          <el-divider>演示账号一键登录</el-divider>
          <el-button type="primary" size="small" plain @click="testAccount('admin')">admin</el-button>
        </div>
      </el-form>
      <el-form v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on">
        <div class="title-container">
          <h3 class="title">探索从这里开始! 🚀</h3>
        </div>
        <div>
          <el-form-item prop="username">
            <el-input ref="name" v-model="registerForm.username" placeholder="用户名" tabindex="0" autocomplete="on">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
<!--          <el-form-item prop="email">-->
<!--            <el-input ref="name" v-model="registerForm.email" placeholder="电子邮箱" tabindex="1" autocomplete="on">-->
<!--              <template #prefix>-->
<!--                <el-icon>-->
<!--                </el-icon>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="captcha">-->
<!--            <el-input ref="captcha" v-model="registerForm.captcha" placeholder="验证码" tabindex="2" autocomplete="on">-->
<!--              <template #prefix>-->
<!--                <el-icon>-->
<!--                </el-icon>-->
<!--              </template>-->
<!--              <template #append>-->
<!--                <el-button @click="GetCaptcha(registerForm.email)" :disabled="!isAvailable">{{ countdownNumber }}</el-button>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item prop="password">
            <el-input ref="password" v-model="registerForm.password" :type="passwordType" placeholder="密码" tabindex="3" autocomplete="on">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
              <template #suffix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input ref="checkPassword" v-model="registerForm.checkPassword" :type="passwordType" placeholder="确认密码" tabindex="4" autocomplete="on">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
              <template #suffix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">注册</el-button>
        <div class="sub-link">
          <span class="text">已经有帐号?</span>
          <el-link type="primary" :underline="false" @click="formType = 'login'">去登录</el-link>
        </div>
      </el-form>
      <el-form v-show="formType === 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form" auto-complete="on">
        <div class="title-container">
          <h3 class="title">忘记密码了? 🔒</h3>
        </div>
        <div>
<!--          <el-form-item prop="email">-->
<!--            <el-input ref="name" v-model="resetForm.email" placeholder="电子邮箱" tabindex="1" autocomplete="on">-->
<!--              <template #prefix>-->
<!--                <el-icon>-->
<!--                </el-icon>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item prop="captcha">-->
<!--            <el-input ref="captcha" v-model="resetForm.captcha" placeholder="验证码" tabindex="2" autocomplete="on">-->
<!--              <template #prefix>-->
<!--                <el-icon>-->
<!--                </el-icon>-->
<!--              </template>-->
<!--              <template #append>-->
<!--                <el-button @click="GetCaptcha(resetForm.email)" :disabled="!isAvailable">{{ countdownNumber }}</el-button>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item prop="password">
            <el-input ref="password" v-model="resetForm.password" :type="passwordType" placeholder="新密码" tabindex="3" autocomplete="on">
              <template #prefix>
                <el-icon>
                </el-icon>
              </template>
              <template #suffix>
                <el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </div>
        <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleReset">确认</el-button>
        <div class="sub-link">
          <el-link type="primary" :underline="false" @click="formType = 'login'">返回登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()

import { userRegister } from "@/api/user.js"
import {getCurrentInstance, nextTick, ref} from "vue";

const Router = useRouter()
import useUserStore from "@/store/user";
const userStore = useUserStore()

const banner = new URL('../assets/login-banner.png', import.meta.url).href
const title = import.meta.env.VITE_APP_TITLE

// 表单类型，login 登录，reset 重置密码
const formType = ref('login')

// 登录
const loginForm = ref({
  username: localStorage.login_account || '',
  password: '',
  remember: !!localStorage.login_account
})
const loginRules = ref({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
  ]
})
function handleLogin() {
  proxy.$refs.loginFormRef.validate(valid => {
    if (valid) {
      userStore.login(loginForm.value).then(_ => {
        Router.push('/search')
      })
    }
  })
}

// 注册
const registerForm = ref({
  username: '',
  // captcha: '',
  password: '',
  checkPassword: '',
  // email: '',
})
const registerRules = ref({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' }
  ],
  // email: [
  //   { required: true, trigger: 'blur', message: '请输入电子邮箱' },
  //   { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
  // ],
  // captcha: [
  //   { required: true, trigger: 'blur', message: '请输入验证码' },
  // ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: ['blur', 'change'], message: '密码长度为6到18位' }
  ],
  checkPassword: [
    { required: true, trigger: ['blur', 'change'], message: '请再次输入密码' },
    { validator: (rule, value, callback) => {
        console.log(value,registerForm.value.password)
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } }
  ]
})
function handleRegister() {
  proxy.$refs.registerFormRef.validate(valid => {
    if (valid) {
      console.log(registerForm.value)
      userRegister(registerForm.value).then(res => {
        ElMessage.success(`${registerForm.value.username},注册成功`)
        formType.value = 'login'
      })
    }
  })
}

// 重置密码
const resetForm = ref({
  email: '',
  captcha: '',
  password: ''
})
const resetRules = ref({
  // email: [
  //   { required: true, trigger: 'blur', message: '请输入电子邮箱' },
  //   { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
  // ],
  // captcha: [
  //   { required: true, trigger: 'blur', message: '请输入验证码' },
  // ],
  password: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' }
  ]
})
function handleReset() {
  proxy.$refs.resetFormRef.validate(valid => {
    if (valid) {
      // 这里编写业务代码
    }
  })
}

const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

function showPassword() {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
  nextTick(() => {
    proxy.$refs.password.focus()
  })
}

function testAccount(username) {
  loginForm.value.username = username
  loginForm.value.password = '123456'
  handleLogin()
}


const countdownNumber = ref('发送验证码')
const isAvailable = ref(true)

const countdown = (time)=>{
  if (time===0){
    countdownNumber.value = '发送验证码'
    isAvailable.value = true
  } else {
    countdownNumber.value ='请等待'+time+'秒'
    isAvailable.value = false
    time--
    setTimeout(()=>countdown(time),1000)
  }
}

</script>

<style lang="scss" scoped>
[data-mode="mobile"] {
  #login-box {
    position: relative;
    width: 100%;
    height: 100%;
    top: inherit;
    left: inherit;
    transform: translateX(0) translateY(0);
    flex-direction: column;
    justify-content: start;
    border-radius: 0;
    box-shadow: none;
    .login-banner {
      width: 100%;
      padding: 20px 0;
      .banner {
        position: relative;
        right: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        display: inherit;
        top: inherit;
        transform: translateY(0);
      }
    }
    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }
  .copyright {
    position: relative;
    bottom: 0;
    padding-bottom: 10px;
  }
}
:deep(input[type="password"]::-ms-reveal) {
  display: none;
}
.bg-banner {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--el-fill-color-lighter), var(--el-bg-color-page));
}
#login-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: var(--el-bg-color);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow);
  .login-banner {
    position: relative;
    width: 450px;
    background-color: var(--el-fill-color-light);
    .banner {
      position: absolute;
      width: calc(100% + 100px);
      right: -50px;
      top: 100px
    }
  }
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 500px;
    width: 500px;
    padding: 50px;
    overflow: hidden;
    .title-container {
      position: relative;
      .title {
        font-size: 1.3em;
        color: var(--el-text-color-primary);
        margin: 0 auto 30px;
        font-weight: bold;
      }
    }
  }
  .el-form-item {
    margin-bottom: 24px;
    :deep(.el-input) {
      height: 48px;
      line-height: inherit;
      width: 100%;
      input {
        height: 48px;
      }
      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }
      .el-input__prefix {
        left: 10px;
      }
      .el-input__suffix {
        right: 10px;
      }
    }
  }
  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
    .text {
      margin-right: 10px;
    }
  }
}
.copyright {
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin: 0;
}
</style>
