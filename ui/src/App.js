import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './assets/sass/FixedNavbar.scss';

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MoreCategory from "./Pages/MoreCategory";
import SinglePost from "./Pages/SinglePost";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

import Account from "./Pages/Account";
import MyPosts from "./Pages/MyPosts";
import SettingProfile from "./Pages/SettingProfile";
import UpdatePost from "./Pages/UpdatePost";
import WritePost from "./Pages/WritePost";
import ResetPassword from "./Pages/ResetPassword";

import FourToFour from "./Pages/404";

function App() {

  window.addEventListener('scroll', ()=>{

      if(window.scrollY > 100){
        document.getElementById('navbar-fixed').classList.add('active');
        console.log(window.scrollY)
        if(window.scrollY > 1444 && document.querySelector('.HomePage') ){
          console.log('Test nice')
          document.querySelector('.Arrow').classList.add('visible');
        }else if(window.scrollY <= 1444 && !document.querySelector('.HomePage')){
          document.querySelector('.Arrow').classList.remove('visible');
        }
  
      }else{
        document.getElementById('navbar-fixed').classList.remove('active');
      }



    // }

  })



  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/category">
          <MoreCategory />
        </Route>
        <Route path="/single-post">
          <SinglePost />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/setting">
          <SettingProfile />
        </Route>
        <Route path="/write">
          <WritePost />
        </Route>
        <Route path="/update">
          <UpdatePost />
        </Route>
        <Route path="/posts">
          <MyPosts />
        </Route>
        <Route path="/password">
          <ResetPassword />
        </Route>
        <Route path="*">
          <FourToFour />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
