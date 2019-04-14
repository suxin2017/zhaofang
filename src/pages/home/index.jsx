import React, { useState } from 'react'
import styles from './index.module.scss';
import temJpg from './img/templete.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Icon from 'components/Icon'

export default function index(props) {
  const [list, setCount] = useState([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  const listView = list.map((item, ) => {
    return item.map((item, index) => {
      return (<Card key={index} style={{ margin: '20px 0px' }}>
        <CardImg top height="260vw" width="390px" src={temJpg} alt="Card image cap" />
        <CardBody style={{ padding: '0.8rem 0' }}>
          <Container>

            <Row >
              <Col style={{ color: '#666' }}> 哪里的房子</Col>
              <Col style={{ textAlign: 'right' }}> 价格</Col>
            </Row>
          </Container>

        </CardBody>
      </Card>)
    })
  })

  console.log(listView)
  return (
    <div>
      <div className={styles.top}>

        <img className='logo' src={process.env.PUBLIC_URL + '/img/bg.png'} alt="背景" width="100%"></img>
        <div className={styles.inputGroup}>
          <div className={styles.bg}>
            <InputGroup style={{ margin: '0 auto', width: '40%' }} >
              <Input placeholder="地点" />
              <InputGroupAddon addonType="append"><Button color="warning" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search" type="search" size="20" color="#fff"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></Button></InputGroupAddon>
            </InputGroup>
          </div>


        </div>


      </div>
      <div className={styles.center}>
        123
        <Container>
          <Row className="align-items-center">
            <Col sm="4"> {listView[0]}</Col>
            <Col sm="4"> {listView[1]}</Col>
            <Col sm="4">  {listView[2]}</Col>
          </Row>
        </Container>


      </div>
    </div>
  )
}
