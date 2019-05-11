import React,{useState,useEffect} from 'react'
import { Container, Card, Badge, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import styles from './index.module.scss'
import './index.scss'
import g from 'util/g';
import { Tabs,Table } from 'antd';
import r from 'util/r';
import cookie from 'cookie'
import {message} from 'antd'
const TabPane = Tabs.TabPane;

const ListView = function (props) {
  let { config } = props;
  const view = config.map((it, i) => {
    return <ListGroupItem key={i} className={styles.listgroup}><span> {it.title} : </span>{it.content} </ListGroupItem>

  })
  return (
    <ListGroup >
      {view}
    </ListGroup>
  )
}

export default function index(props) {
  console.log(props)
  const history = props.history;
  function handleDelete(items){
     console.log(items)
     r.get('/delete/room', {
      params: {
        id:items.id
      }
    }).then(e=>{
      r.get('/get/room', {
        params: {
          current: 1,
          userId:e.data.data.id||userInfo.id,
        }
      }).then(e => {
        if (!e.data.data) { return }
        let records = e.data.data.records;
        setMyRoom(records)
        console.log(records, 'arr')
      })

      r.get('/get/room', {
        params: {
          current: 1,
          signId:e.data.data.id||userInfo.id,
        }
      }).then(e => {
        if (!e.data.data) { return }
        let records = e.data.data.records;
        setOtherRoom(records)
        console.log(records, 'arr')
      })
    })
  }
  const tabList = [{
    key: 'tab1',
    tab: 'tab1',
  }, {
    key: 'tab2',
    tab: 'tab2',
  }];
  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };
  const columns = [{
    title: '标题',
    dataIndex: 'title',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '面积',
    dataIndex: 'area',
  }, {
    title: '地址',
    dataIndex: 'address',
  },{
    title: '价格',
    dataIndex: 'price',
  },{
    title: '楼层',
    dataIndex: 'price',
  },{
    title: '交通',
    dataIndex: 'transportation',
  },{
    title:'操作',
    render: item => {
      console.log(item,userInfo)
    if(item.signId&&item.signId===userInfo.id){
  
      return  <a href="javascript:;" onClick={handleDelete.bind(this,item)}>取消签约</a>
    }else{
      return  <a href="javascript:;" onClick={handleDelete.bind(this,item)}>删除</a>
    }
  }
  }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];
  const [userInfo, setUserInfo] = useState({});
  const [myRoom,setMyRoom] = useState([])
  const [otherRoom,setOtherRoom] = useState([])

    useEffect(()=>{
      r.get('/account/user').then(e=>{
        const data = e&& e.data && e.data.data || {};
        if(userInfo&&userInfo.id!==data.id){
          setUserInfo(e.data.data)
          
        }
        r.get('/get/room', {
          params: {
            current: 1,
            userId:e.data.data.id||userInfo.id,
          }
        }).then(e => {
          if (!e.data.data) { return }
          let records = e.data.data.records;
          setMyRoom(records)
          console.log(records, 'arr')
        })

        r.get('/get/room', {
          params: {
            current: 1,
            signId:e.data.data.id||userInfo.id,
          }
        }).then(e => {
          if (!e.data.data) { return }
          let records = e.data.data.records;
          setOtherRoom(records)
          console.log(records, 'arr')
        })
      })

    },{})
 

  const mycookie = cookie.parse(document.cookie)
  if(!mycookie.userid){
    message.success('请先登陆',0.5,()=>{
        history.push("/account/login") 
    })
  }
  console.log(userInfo)
  return (
    <Container className='userinfo' style={{ marginTop: '20px' }}>
      <div class="card">
        <div class="card-header">
          个人中心
    </div>
        <div class="card-body">
          <div class="row">
            <div class="col col-lg-2 ddd">
              用户名：
            </div>
            <div class="col-sm">
              {userInfo.name}
            </div>
          </div>
          <div class="row">
            <div class="col col-lg-2 ddd">
              邮箱：
            </div>
            <div class="col-sm">
              {userInfo.email}
            </div>
          </div>  <div class="row">
            <div class="col col-lg-2 ddd">
              密码：
            </div>
            <div class="col-sm">
              {userInfo.password}
            </div>
          </div>
        </div>
<div style={{margin:'20px'}}>
<Tabs defaultActiveKey="1" onChange={console.log}>
          <TabPane tab="签约" key="1">
          <Table columns={columns} dataSource={otherRoom} pagination={false}/></TabPane>
          <TabPane tab="我的房子" key="2"> 
          <Table columns={columns} dataSource={myRoom} pagination={false}/></TabPane>
        </Tabs>
</div>
        
      </div>
    </Container>
  )
}
