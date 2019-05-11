import React,{useState,useEffect} from 'react'
import { Container, Row, Col, Nav, NavItem, } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route,NavLink  } from "react-router-dom";
import r from 'util/r';
import Icon from '../../components/Icon'
import './index.scss'
export default function Footer(props) {
  console.log(props,123)
  const history = props.history;

  let list = [1,0,0,0];
  const [userInfo, setUserInfo] = useState({});

      r.get('/account/user').then(e=>{
        const data = e&& e.data && e.data.data || {};
        if(userInfo&&userInfo.id!==data.id){
          setUserInfo(e.data.data)
        }
      })
      function handleLogout(){
        r.get('account/logout').then(e=>{
            setUserInfo({})
            window.location.replace("/account/login")
        })
      }
  return (
    <header>
      <Container>
        <Row className="align-items-center">
          <Col xs="3"><img className='logo'  src={process.env.PUBLIC_URL + '/img/logo.png'} alt="找房网logo" width="100%"></img> </Col>
          <Col xs="7">
          <ul className="nav">
                <li className="nav-item">
                  <NavLink className={'nav-link'} to="/home" state={123}>首页</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " to="/room/rent">租房</NavLink>

                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " to="/room/buy">买房</NavLink>

                </li>
                <li className="nav-item">
                  <NavLink className="nav-link "  to="/romesell">业主</NavLink>

                </li>
              </ul>

          </Col>
          <Col xs="2"> <a href="/userinfo"><Icon type="user" /></a>
          {userInfo.id && <span> <span style={{marginLeft:'20px'}}>{userInfo.name}</span>  | </span>} {userInfo.id && <a styles={{marginLeft:"20px"}} onClick={handleLogout}>退出</a>}
          {!userInfo.id && <span><a href="/account/login">登陆</a> | <a href="/account/register">注册</a></span>}
          </Col>
        </Row>
      </Container>


    </header>
  )
}
