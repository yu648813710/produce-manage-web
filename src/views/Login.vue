<template>
  <div id="login">
    <div class="alpha-area">
      <div class="form-area">
        <a-row class="row-tip" justify="center" align="middle">
          <a-col :span="6">
            <img src="../assets/image/logo.png" style="width:72px;height:72px;" alt="logo" />
          </a-col>
        </a-row>
        <a-row class="row-tip" justify="center" align="middle">
          <p class="title">柞水木耳物联网大数据平台</p>
        </a-row>
        <a-form :form="form" @submit="login">
          <a-row class="row-user-name" justify="center" align="middle">
            <a-col v-for="(i, index) in formdata" :key="i.id" :span="24">
              <a-form-item :label="i.label">
                <a-input
                  autocomplete="off"
                  v-if="index === 0"
                  class="row-input"
                  size="large"
                  v-decorator="[
                        `login-${i.id}`,
                        {
                        rules: i.rule,
                        }
                    ]"
                  :placeholder="i.plc"
                  @change="handleInput"
                >
                  <a-icon slot="prefix" type="user" />
                  <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmptyName" />
                </a-input>
                <a-input
                  v-else
                  autocomplete="off"
                  :type="isPassword ? '' : 'password'"
                  class="row-input pwd"
                  size="large"
                  v-decorator="[
                    `login-${i.id}`,
                    {
                    rules: i.rule,
                    }
                    ]"
                  :placeholder="i.plc"
                  @change="handleInput"
                >
                  <a-icon slot="prefix" type="lock" />
                  <a-icon
                    style="cursor: pointer;"
                    slot="addonAfter"
                    :type="isPassword ? 'eye' : 'eye-invisible'"
                    @click="seePwdAction"
                  />
                  <!-- <a-icon v-if="passwd" slot="suffix" type="close-circle" @click="emitEmptyPwd"/> -->
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="row-btn">
            <a-col :span="24">
              <a-button class="btn-login" html-type="submit" @click="login">确 认 登 录</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Row, Col, Icon, Input, Form } from 'ant-design-vue'
Vue.use(Form)
export default {
  name: 'Login',
  components: {
    'a-button': Button,
    'a-row': Row,
    'a-col': Col,
    'a-icon': Icon,
    'a-input': Input
  },
  computed: {},
  data() {
    // [角色名称]校验规则:
    const ValidatorName = (rule, value, callback) => {
      let errors = []
      if (!value || JSON.stringify(value).length === 0) {
        errors.push(new Error('请输入账号'))
      }
      callback(errors)
    }
    const ValidatorPwd = (rule, value, callback) => {
      let errors = []
      if (!value || JSON.stringify(value).length === 0) {
        errors.push(new Error('请输入密码'))
      } else if (value && JSON.stringify(value).length < 8) {
        errors.push(new Error('密码长度不能小于6'))
      } else if (value && JSON.stringify(value).length > 18) {
        errors.push(new Error('密码长度不能大于16'))
      }
      callback(errors)
    }
    const myrules = [
      [{ required: false, validator: ValidatorName }],
      [{ required: false, validator: ValidatorPwd }]
    ]
    return {
      userName: '',
      passwd: '',
      isPassword: false,
      form: this.$form.createForm(this),
      formdata: [
        { id: 0, label: '', plc: '请输入账号', rule: myrules[0] },
        { id: 1, label: '', plc: '请输入密码', rule: myrules[1] }
      ]
    }
  },
  mounted() {},
  methods: {
    login(e) {
      let self = this
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (error === null || !error) {
          if (this.userName === 'admin' && this.passwd === '123456') {
            self.$store.commit('SET_USERTOKEN', '123')
            self.$router.push('/')
          } else {
            self.$message.info('用户名或密码错误')
          }
        }
      })
    },

    handleInput(e) {
      if (e.target.id === 'login-0') {
        this.userName = e.target.value
      } else if (e.target.id === 'login-1') {
        this.passwd = e.target.value
      }
    },

    emitEmptyName() {
      let self = this
      this.$nextTick(() => {
        self.form.setFieldsValue({
          'login-0': ''
        })
        self.userName = ''
      })
    },

    emitEmptyPwd() {
      let self = this
      this.$nextTick(() => {
        self.form.setFieldsValue({
          'login-1': ''
        })
        self.passwd = ''
      })
    },
    seePwdAction() {
      this.isPassword = !this.isPassword
    }
  }
}
</script>
<style lang="less" scoped>
#login {
  width: 100%;
  height: 100vh;
  background: #fff;

  .alpha-area {
    background: url('../assets/image/login_bg.png') no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 100vw;
    overflow: hidden;
    .form-area {
      overflow: hidden;
      text-align: center;
      width: 400px;
      height: auto;
      margin: 100px auto 0;
      .title {
        font-size: 16px;
        line-height: 22px;
        color: #7db133;
        margin: 14px 0 30px;
      }
      .row-tip {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .ant-form-item {
        margin: 0;
        margin-top: 20px;
      }
      .row-user-name {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;

        .row-input {
          width: 100%;
          i {
            color: #ccc;
          }
          .pwd {
            border-right: 0;
          }
        }
      }

      .row-btn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 48px;

        .btn-login {
          border: none;
          border-radius: 4px;
          background-color: #7db133;
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          height: 40px;
          width: 100%;
        }
      }
    }
  }
}

/deep/ .ant-input-group-addon:last-child {
  background-color: transparent;
  position: relative;
  left: 0px;
}
</style>
