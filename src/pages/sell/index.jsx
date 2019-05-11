import React, { useRef } from 'react'
import { Container } from 'reactstrap';
import {extend} from 'umi-request'
import cookie from 'cookie'
import './index.scss'
import {
  BreadcrumbItem, Breadcrumb
} from 'reactstrap';
import {
  Form, Select, InputNumber, RadioGroup, Switch, Radio,
  Slider, Button, Icon, Rate, Checkbox,
  Row, Col, Input,Upload
} from 'antd';
import { message } from 'antd';

import TextArea from 'antd/lib/input/TextArea';

function index(props) {
  const form = props.form;
  const history = props.history;
  const { getFieldDecorator, getFieldsValue } = form;
  // alert(form.getFieldDecorator)
  console.log(form)
  const RadioGroup = Radio.Group;
const request = extend()
  const config = [{
    label: '标题',
    key: 'title',
    dom: <Input required/>
  }, {
    label: '业务类型',
    key: 'cls',
    dom: <RadioGroup required>
      <Radio value={0}>卖房</Radio>
      <Radio value={1}>出租房</Radio>
    </RadioGroup>
  }, {
    label: '地址',
    key: 'address',
    dom: <Input required/>
  }, {
    label: '价格范围',
    key: 'priceRange',
    dom:<RadioGroup required>
    <Radio value={'<2000'}>{'<2000'}</Radio>
    <Radio value={'2000-3000'}>2000-3000</Radio>
    <Radio value={'3000-5000'}>3000-5000</Radio>
    <Radio value={'>5000'}>{'>5000'}</Radio> 
  </RadioGroup>
  },
  {
    label: '价格',
    key: 'price',
    dom: <Input required/>
  },  
   {
    label: '面积',
    key: 'area',
    dom: <Input required/>
  }, {
    label: '朝向',
    key: 'type',
    dom: <Input required/>
  }, {
    label: '户型',
    key: 'roomType',
    dom:<RadioGroup required>
    <Radio value={'三室一厅'}>三室一厅</Radio>
    <Radio value={'两室一厅'}>两室一厅</Radio>
    <Radio value={'一居室'}>一居室</Radio>
  </RadioGroup>
  }, {
    label: '楼层',
    key: 'level',
    dom: <Input required/>
  }, {
    label: '交通',
    key: 'transportation',
    dom: <Input required/>
  },{
    label: '描述',
    key: 'description',
    dom: <TextArea required/>
  }, ]
  const formItemLayout = {
    labelCol: {
      xs: { span: 6, },
    },
    wrapperCol: {
      xs: { span: 8 },
    },
  };
  const handleSubmit = (e) => {

    e.preventDefault()
    const data = getFieldsValue();
    let fd = new FormData();
    for (let i in data) {
      if (Array.isArray(data[i])) {
        let arr = [];
        for (let _i in data[i]) {
          arr.push(data[i][_i].originFileObj)
        }
        fd.append(i, arr[0])

      } else {
        fd.append(i, data[i])
      }
    }
 
    request.post("http://127.0.0.1:8080/save", {
      data: fd
    }).then(()=>{
      message.success("上传成功",1,()=>{
        // history.push("/home")
      })
    })
  }
  const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
    const formView = config.map((it, i) => {
      return (
        <Form.Item
          key={i}
          label={it.label}
        >  {getFieldDecorator(it.key)(
          it.dom
        )}
        </Form.Item>
      )
    })
    const mycookie = cookie.parse(document.cookie)
    if(!mycookie.userid){
      message.success('请先登陆',0.5,()=>{
          history.push("/account/login") 
      })
    }
    return (
      <div className='sell'>
        <Container className='sellcontainer'>
          <Breadcrumb>

            <BreadcrumbItem active>首页>卖房</BreadcrumbItem>
          </Breadcrumb>

          <Form  {...formItemLayout} onSubmit={handleSubmit}>
            {formView}
            <Form.Item
                label="上传图片"
              >
                {getFieldDecorator('file', {
                  valuePropName: 'fileList',
                  getValueFromEvent: normFile,

                })(
                  <Upload showUploadList={false}>
                    <Button>
                      <Icon type="upload" /> Click to upload
              </Button>
                  </Upload>
                )}
              </Form.Item>
            <Form.Item
              wrapperCol={{ span: 8, offset: 6 }}
            >
              <Button
                type="primary"
                htmlType="submit"
              >
                提交
          </Button>
            </Form.Item>
          </Form>

        </Container></div>
    )
  }
  index = Form.create({})(index);
  export default index;