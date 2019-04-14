import React from 'react'
import { Container, Row, Col,Nav, NavItem, NavLink} from 'reactstrap';
import Icon from '../../components/Icon'
import './index.scss'
export default function Footer() {
  console.log(process.env.PUBLIC_URL)
  return (
    <footer>
      <Container>
      <Row className="align-items-top">

      <Col xs="2"><img className='logo' src={process.env.PUBLIC_URL + '/img/logo.png'} alt="找房网logo" width="100%"></img> </Col>
      <Col xs="7">
      <div>
        <p> ZHAOF ANG科技有限公司Copyright@2019 zhangfang.com版权所有</p>      
      <p>  本网站所有页面的数据统计均来源于自如数据库联系客服:找房网微信周-至周日09:00-22:00</p>  
      <p> 违法和不良信息举报电话: 010-xxxxxx 违法和不 良信息举报</p>  
    
      </div>
     </Col>
     </Row>
      </Container>

     
    </footer>
  )
}
