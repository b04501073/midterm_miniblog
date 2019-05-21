import React from 'react';
import './App.css';

import Home from "./containers/home";
import { BrowserRouter, NavLink, Switch, Route, Redirect } from "react-router-dom";
import NewPost from './containers/NewPost'
import Search from './containers/search'

function App() {
  
  // socket.emit("test_channel", "Max")
  
  // let socket = socketIOClient("http://localhost:4040");
  return (
    <div className="App">
      <BrowserRouter>
        <Index />
        <Switch>
          <Route exact path="/post" component={NewPost} /> 
          <Route exact path="/search" component={Search} />          
          <Route path="/" component={Home} />
          <Redirect from="/home" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const Index = () => <div className="index">
                        <h5><NavLink to="/home" id='idx'>HOME</NavLink></h5>
                        <h5><NavLink to="/post" id='idx'>NEW POST</NavLink></h5>
                        <h5><NavLink to="/search" id='idx'>SEARCH</NavLink></h5>
                    </div>
  
// const Button = () => <button id="searchicon"><img src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png"></img></button>
export default App;
