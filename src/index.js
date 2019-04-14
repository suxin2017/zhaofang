import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//图标
import feather from 'feather-icons'
      
ReactDOM.render(<App />, document.getElementById('root'));
//替换图标超级特殊的用法哈哈哈哈
//转换图标到svg
feather.replace({ 'stroke-width': 1 });