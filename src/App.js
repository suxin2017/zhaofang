import React, { useState,useReducer } from 'react';
import './App.css';
import Icon from 'components/Icon'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import _404 from 'pages/404';
import Home from 'pages/home'
import Account from 'pages/account'
import Details from 'pages/details'
import Rome from 'pages/rome'
import Sell from 'pages/sell'

import route from './config/route.config.js'
import  userInfo from 'pages/userinfo';


const initialState = {count: 0};

function App(props) {
  // Declare a new state variable, which we'll call "count"
console.log(props,'aabbcc')
  return (
    <div>
      <Router>
      <Header ></Header>

        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/account/:type' component={Account}></Route>
          <Route path='/account/:type' component={Account}></Route>
          <Route path='/romesell' component={Sell}></Route>
          <Route path='/room/:type' component={Rome}></Route>
          <Route path='/rome/:type' component={Rome}></Route>
          <Route path='/userinfo' component={userInfo}></Route>
          <Route path='/details/:id' component={Details}></Route>

          <Route component={_404} />
        </Switch>
      <Footer></Footer>

      </Router>



    </div>
  );
}

export default App;
