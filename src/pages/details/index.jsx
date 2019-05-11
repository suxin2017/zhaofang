/* eslint-disable default-case */
import React,{useState, useEffect} from 'react'
import temJpg from './img/templete.png'
import { Container, Badge, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import styles from './index.module.scss'
import './index.scss'
import g from 'util/g';
import r from 'util/r';
import cookie from 'cookie'
const ListView = function(props){
  let {config} = props;
  console.log(config,'123')
  const view = config.map((it,i)=>{
    return <ListGroupItem key={i} className={styles.listgroup}><span> {it.title} : </span>{it.content} </ListGroupItem>

  })
  return (
    <ListGroup >
   {view}
  </ListGroup>
  )
}
// address: "顺义"
// id: 1
// imageUri: "file:///Users/xw/tmp/1555478848654timg.jpeg"
// level: "8层"
// price: "2000"
// room_type: null
// title: "北京朝阳 向阳房"
// transportation: "距离地铁20m"
// type: 1
export default function index(props) {
  console.log(props,'sha')
  const {location:{state:info}} = props;
  const {cls} = info;
  console.log(info,'aabbcc')
  let unit;
 
  const viewConfig = [{
    title:'面积',
    content:info.area+' ㎡ (使用面积)',
  },{
    title:'朝向',
    content:info.type,
  },{
    title:'户型',
    content:info.roomType,
  },{
    title:'楼层',
    content:info.level,
  },{
    title:'交通',
    content:info.transportation,
  }]
  const [otherConfig, setOtherConfig] = useState([]);
  switch (cls) {
		case 0://买房
      unit="平方米"
      useEffect(()=>{
        setOtherConfig([{
          title:'编号',
          content:'BJZRGY0818334551_0'+info.id,
        },{
          title:'房源介绍',
          content:info.description,
        },{
          title:'共计',
          content:`￥${info.price*info.area}`,
        }
      ])
    },{})
			break;
    case 1://租房
    unit="每月"
      useEffect(()=>{
        setOtherConfig([{
          title:'编号',
          content:'BJZRGY0818334551_0'+info.id,
        },{
          title:'房源介绍',
          content:info.description,
        },{
          title:'月付',
          content:`￥${info.price}/月`,
        },{
          title:'季付',
          content:`￥${info.price*3*0.9}/月`,
        },{
          title:'年付',
          content:`￥${info.price*12*0.8}/月`,
        }]) 
      },{})
      break;
  }
  function sign(){
    let userInfo = cookie.parse(document.cookie)
    info.signId = Number(userInfo.userid)
    console.log(userInfo)
    r.post("/sign/room", {
      ...info
    })
  }
  return (
    <Container className='details'>
      <Row className={styles.header}>
        <Col> <img className='logo' src={g.imageUrl+info.imageUri} alt="背景" width="100%"></img>
        </Col>
        <Col>
          <div>
            <Row className='align-items-center'>
              <Col xs={7}>
                <h2>{info.title}</h2>
                <p>{info.address}</p>
              </Col>
              <Col>
                <div className='price'>
                  <h2 className='text-center' >¥{info.price}<span>({unit})</span></h2>
                </div>
              </Col>
            </Row>
          </div>

          <ListView config={viewConfig}></ListView>
          
          <Button className='fw nb' block onClick={sign} style={{background:'#ff8400'}}>我要签约</Button>
        </Col>
      </Row>
      <Row className={'bottom'}>
        <Col xs={8}> 
        <div className='list'>
          <div className='title'>
          <span className='span1'> </span>

          <h4 className='cn'>关于此房源</h4>
            <span className='span2'></span>
         
          </div>
        </div>
        <ListView config={otherConfig}></ListView>

   
        </Col>
        <Col>
        <div className={styles.title}> 423 123 1231 - 231213</div>
        <ListGroup>
        <ListGroupItem className="justify-content-between dddd">找房网承诺 </ListGroupItem>
        <ListGroupItem className="justify-content-between">
        <Row>
          <Col>环保装修，密闭检测出租</Col><span className='division'></span>
          <Col>签约三天不满意，零违约金退租</Col>
        </Row>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between">
        <Row>
          <Col>漏水保固，补偿日租金 </Col><span className='division'></span>
          
          <Col>退租费用，三工作日到账</Col>
        </Row></ListGroupItem>
        <ListGroupItem  className="justify-content-between icon"> <Row>
          <Col>信用体系 </Col><span className='division'></span>
          <Col>租客保险</Col><span className='division'></span>
          <Col>安全</Col>
        </Row></ListGroupItem>
      </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}
