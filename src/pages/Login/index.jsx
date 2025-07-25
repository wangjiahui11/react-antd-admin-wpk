import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { useStore } from '@/store'
import { login } from '@/service/user/user'
import { setLocalStorage } from '@/utils/session'
import './index.less'

export default function Login() {
  const { userStore } = useStore()
  const onFinish = (values) => {
    const { username, password } = values
    if(username!== 'user' && username !== 'admin') {
      message.error('用户名错误！请检查')
    } else {
      login({
        username,
        password
      }).then(res => {
        userStore?.setUserInfo(res)
        setLocalStorage('token', res.token)
        message.success(`欢迎 ${ res.name }登录~~`)
        window.location.href = '#/homepage'
      })
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <div className='container'>
      <Form
        className='box'
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 12,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          style={{marginTop: '50px'}}
          rules={[
            {
              required: true,
              message: '请输入账号！',
            },
          ]}
        >
          <Input placeholder='user or admin'  />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        >
          <Input.Password placeholder='密码随便输' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}
        >
          <Button className='login' type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
