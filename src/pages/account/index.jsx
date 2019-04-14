import React from 'react'
import backJpg from './img/login_back.png'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Redirect } from 'react-router'

import './index.scss'
export default function index({ history,match }) {
    console.log(arguments)

    const { type } = match.params;
    let title;
    switch (type) {
        case 'login':
            title = '欢迎登陆'
            break;
        case 'register':
            title = '欢迎注册'
            break;
        default:
         return (<Redirect to="/404"/>);
    }
    return (
        <div className={'login'}>
            <form class="form-signin ">
                <Form>
                    <div class="title  text-center">{title}</div>
                    <FormGroup>
                        <Label for="exampleEmail">邮箱</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="请输入邮箱" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">密码</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="请输入密码" />
                    </FormGroup>
                    <div className='text-center' >

                        <Button className="submit mb-2">提交</Button>
                    </div>
                    <p class="mt-2 mb-2 text-center">&copy; 2017-2019</p>

                </Form>
            </form>
        </div>
    )
}
