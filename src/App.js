import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import Footer from './component/Footer';
import {
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom";
import About from './component/About';

export default class App extends Component {
  pageSize = 9;
  apiKey = 'cba0f09a4f3544da9d9d821d621e6af5';
  country = 'in';
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<News key='general' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='general'/>}></Route>
            <Route exact path='business' element={<News key='business' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='business'/>}></Route>
            <Route exact path='entertainment' element={<News key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='entertainment'/>}></Route>
            <Route exact path='health' element={<News key='health' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='health'/>}></Route>
            <Route exact path='science' element={<News key='science' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='science'/>}></Route>
            <Route exact path='sports' element={<News key='sports' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='sports'/>}></Route>
            <Route exact path='technology' element={<News key='technology' pageSize={this.pageSize} apiKey={this.apiKey} country={this.country} category='technology'/>}></Route>
            <Route exact path='about' element={<About/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    )
  }
}
