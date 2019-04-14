import React, { useState } from 'react';
import './App.css';
import Icon from 'components/Icon'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import _404 from 'pages/404';
import Home from 'pages/home'
import Account from 'pages/account'
import Details from 'pages/details'
import route from './config/route.config.js'

function App() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <Router>
      <Header></Header>

        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/account/:type' component={Account}></Route>
          <Route path='/account/:type' component={Account}></Route>
          <Route path='/details/:id' component={Details}></Route>

          <Route component={_404} />
        </Switch>
      <Footer></Footer>

      </Router>



    </div>
  );
}

export default App;
