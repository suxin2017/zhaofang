import React,{useState} from 'react'
import backJpg from './img/login_back.png'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Redirect } from 'react-router'
import r from 'util/r'
import './index.scss'

export default function index({ history,match,location }) {
    console.log(arguments)

    const [redirect,setRedirect] = useState(false)

    const { type } = match.params;
    let title;
    let view;
    switch (type) {
        case 'login':
            title = '欢迎登陆'
   
            break;
        case 'register':
            title = '欢迎注册'
           view= <FormGroup>
            <Label for="name">用户名</Label>
            <Input  name="name" id="exampleEmail" placeholder="请输入用户名" />
        </FormGroup>
            break;
        default:
         return (<Redirect to="/404"/>);
    }
    function handelSubmit(e){
        e.preventDefault();
        let {name:{value:name},email:{value:email},password:{value:password}} = document.form;
        console.log(name,email,password)
        switch(type){
            case 'login':
            r.post('/account/login',{name:name,email:email,password:password}).then(e=>{
                console.log(e.data.data)
                if(e.data.data){
                    console.log(setRedirect)
                    window.location.pathname='/home'
                }
            })
            break;
            case 'register':
            r.post('/account/regisiter',{name:name,email:email,password:password}).then(e=>{
                // if(e.data.data){
                //     console.log(setRedirect)
                //     window.location.pathname='/home'
                // }
                console.log(e)
            })
            break;
        }
     
    }

    return (
        <div className={'login'}>
            <form className="form-signin " >
                <Form name="form" method="post" action="http://localhost:8080/account/login" onSubmit={handelSubmit}>
                    <div className="title  text-center">{title}</div>
                    {view}
                    <FormGroup>
                        <Label for="exampleEmail">邮箱</Label>
                        <Input type="email" name="email" id="exampleEmail" required placeholder="请输入邮箱" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">密码</Label>
                        <Input type="password" name="password" required id="examplePassword" placeholder="请输入密码" />
                    </FormGroup>
                    <div className='text-center' >

                        <Button className="submit mb-2">提交</Button>
                    </div>
                    <p className="mt-2 mb-2 text-center">&copy; 2017-2019</p>

                </Form>
            </form>
        </div>
    )
}
