import React from 'react'
import { Container, Row, Col, Nav, NavItem, } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";

import Icon from '../../components/Icon'
import './index.scss'
export default function Footer() {
  console.log(process.env.PUBLIC_URL)
  return (
    <header>
      <Container>
        <Row className="align-items-center">
          <Col xs="3"><img className='logo'  src={process.env.PUBLIC_URL + '/img/logo.png'} alt="找房网logo" width="100%"></img> </Col>
          <Col xs="7">
          <ul className="nav">
                <li className="nav-item">
                  <Link className="nav-link " to="/">首页</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="#">租房</Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="#">买房</Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link " disabled to="#">卖房</Link>

                </li>
              </ul>

          </Col>
          <Col xs="2"> <Icon type="user" /> <Link to="/account/login">登陆</Link> | <Link to="/account/register">注册</Link></Col>
        </Row>
      </Container>


    </header>
  )
}
