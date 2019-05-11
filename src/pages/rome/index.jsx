import React, { useRef, useEffect, useCallback, useState } from 'react'
import { Container, Badge, Row, Col, ListGroup, ListGroupItem, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'
import styles from './index.module.scss'
import { Pagination } from 'antd';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import r from 'util/r'
import "antd/dist/antd.css";
import './index.scss'
import g from 'util/g';

export default function index({ match }) {
	const { type } = match.params;
	
	let title;
	let cls;
	let unit;
	switch (type) {
		case 'buy':
			title = '买房'
			cls = '0' //类别
			unit = '平方米'

			break;
		case 'rent':
			title = '租房'
			cls=1;
			unit = '每月'

			break;
		default:
			return (<Redirect to="/404" />);
	}	

	useEffect(()=>{
		getPage(1)
	},[match])
	

	const [list, setList] = useState([]);
	const getPage = (current) => {
		r.get('/get/room', {
			params: {
				current: current,
				cls
			}
		}).then(e => {
			if (!e.data.data) { return }
			let records = e.data.data.records;
			setList(e.data.data)
			console.log(records, 'arr')
		}, (e) => {
			console.log('err', e)
		})
	}

	// 区域
	// 地铁
	// 租金
	// 面积

	const { records = [], pages, current, total } = list;
	let view = records.map((item, key) => {
		return (
			<ListGroupItem key={key}>
				<Row>
					<Col xs={3}><img className='fw' src={g.imageUrl+item.imageUri}></img></Col>
					<Col xs={5}>
						<h4 style={{ color: '#444' }}>{item.title}</h4>
						<div className={styles.badgeGroup}>
							<Badge className={styles.badge} >向阳</Badge>
							<Badge className={styles.badge} >公园近</Badge>
							<Badge className={styles.badge} >精装</Badge>
						</div>
						<div className={styles.desc}>
							<p>{item.area} ㎡| {item.type}| {item.roomType}</p>
							<p>{item.transportation}</p>

						</div>
					</Col>
					<Col xs={4} >
						<div className='price'>
							<h2 className='text-center' style={{ paddingTop: '50px' }}>¥{item.price}<span>({unit})</span></h2>
						</div>
						<Link style={{ color: "#fff" }} key={index} to={{
							pathname: `/details/${item.id}`,
							state: { ...item }
						}} >
							<Button className='fw nb' block style={{ background: '#ff8400' }}>
								查看更多</Button></Link>
					</Col>
				</Row>
			</ListGroupItem>
		)
	})

const [room,sq] = useState({});
	const handleClick = (item,_d,set,type) => {
		_d.map(item => item.selected = false)
		item.selected = true;
		set(_d)
		let _room = {...room}
		if(item.title==="全部"){
			delete _room[type];


		}else{
		_room[type]=item.title;

		}
		sq(_room)
	}


	const [address, setaddress] = useState([{title:'全部',selected:true},{title:"顺义",selected:false},
	{title:"昌平",selected:false}]);
	const [price, setPrice] = useState([{title:'全部',selected:true},{title:"<2000",selected:false},
	{title:"2000-3000",selected:false},{title:"3000-5000",selected:false},{title:">5000",selected:false}]);
	const [chaoxiang, setchaoxiang] = useState([{title:'全部',selected:true},{title:"东",selected:false},
	{title:"西",selected:false},	{title:"南",selected:false},	{title:"北",selected:false}]);
	const [roomType, setroomType] = useState([{title:'全部',selected:true},{title:"三室一居",selected:false},
	{title:"两室一厅",selected:false},{title:"一居",selected:false}]);

	const getView=(data,set,type)=>{
	return	data.map((item, i) => {
			return (
				<span onClick={handleClick.bind(this,item,[...data],set,type)} className={`badge badge-pill ${item.selected && 'select'}`} key={i}>
					{item.title}
				</span>
			)
		})
	}
	const addressView = getView(address,setaddress,'address')
const priceView = getView(price,setPrice,'priceRange')
const chaoxiangView = getView(chaoxiang,setchaoxiang,'chaoxiang')
const roomView = getView(roomType,setroomType,'roomType')


	const search = useCallback(node => {
		if (node !== null) {
			node.focus();
		}
	}, [Input]);
	const handlePageChange = (page) => {
		getPage(page)
	}
	const handleInputChange = (e)=>{
		let _room = {...room};
		_room.title=e.target.value;
		sq(_room)
	}
	const handleSearch = ()=>{
		let data = {...room};
		data.type = room.chaoxiang;
		r.post(`/get/room?cls=${cls}`, {
				...data
		}).then(e => {
			if (!e.data.data) { return }
			let records = e.data.data.records;
			setList(e.data.data)
			console.log(records, 'arr')
		}, (e) => {
			console.log('err', e)
		})
	}
	console.log(room,'查询条件')
	return (
		<Container>

			<Breadcrumb>
				<BreadcrumbItem active>首页>{title}</BreadcrumbItem>
			</Breadcrumb>
			<div className={styles.pageView}>
				<InputGroup style={{ width: '40%' }} >
					<input className="form-control" ref={search} onChange={handleInputChange} placeholder="地点" />
					<InputGroupAddon addonType="append"><Button onClick={handleSearch} color="warning" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search" type="search" size="20" color="#fff"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></Button></InputGroupAddon>
				</InputGroup>
				<ListGroup>
					<ListGroupItem><span className={styles.label} >区域 :</span>{addressView}</ListGroupItem>
					<ListGroupItem><span className={styles.label}>租金 :</span>{priceView}</ListGroupItem>
					<ListGroupItem><span className={styles.label}>朝向 :</span>{chaoxiangView}</ListGroupItem>
					<ListGroupItem><span className={styles.label}>居室 :</span>{roomView}</ListGroupItem>
				</ListGroup>
			</div>

			<section className={styles.pageView}>
				<ListGroup>

					<ListGroupItem>		 <Pagination simple current={current} total={total} onChange={handlePageChange} /></ListGroupItem>
					{view}
				</ListGroup>

			</section>

		</Container>
	)
}
