import React, { useState,useEffect } from 'react'
import styles from './index.module.scss';
import temJpg from './img/templete.jpg'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {Link} from 'react-router-dom'
import Icon from 'components/Icon'
import r from 'util/r';
import g from 'util/g';


export default function index(props) {
  

  const [list, setList] = useState([]);
  if(list.length<1){
    r.get('/get/room').then(e=>{
      if(!e.data.data){return}
      let records = e.data.data.records;
     let arr = []
      arr.push(records.slice(0,3))
      arr.push(records.slice(3,6))
      arr.push(records.slice(6,9))
      setList(arr)
    console.log(records,'arr')
    },(e)=>{
      console.log('err',e)
    })
  }

  console.log(list,'123')

  const listView = list.map((item, ) => {
    return item.map((item2, index) => {
      return (<Link key={index} to={{
        pathname: `/details/${item2.id}`,
        state: { ...item2 }
      } } ><Card  style={{ margin: '20px 0px' }}>
        <CardImg top height="260vw" width="390px" src={g.imageUrl+item2.imageUri} alt="Card image cap" />
        <CardBody style={{ padding: '0.8rem 0' }}>
          <Container>
            <Row >
              <Col style={{ color: '#666' }}> {item2.title}</Col>
              <Col style={{ textAlign: 'right' }}> {item2.price}¥</Col>
            </Row>
          </Container>

        </CardBody>
      </Card></Link>)
    })
  })
  function handleInputFocus(){
    props.history.push({
      pathname: `/room/rent`,
    })
  }
  console.log(listView)
  return (
    <div>
      <div className={styles.top}>

        <img className='logo' src={process.env.PUBLIC_URL + '/img/bg.png'} alt="背景" width="100%"></img>
        <div className={styles.inputGroup}>
          <div className={styles.bg}>
            <InputGroup style={{ margin: '0 auto', width: '40%' }} >
              <Input onFocus={handleInputFocus} placeholder="地点" />
              <InputGroupAddon addonType="append"><Button color="warning" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search" type="search" size="20" color="#fff"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></Button></InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className={styles.center}>
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
